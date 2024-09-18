import { DmcInfo } from "../@types/net/hooks/types/dmcinfo.d.ts";
import { OutputHandler } from "../lib/io/output.ts";
import { AttemptResult } from "../lib/utils/attemptResult.ts";
import { DataConverterImpl } from "./converter/dataCnverter.ts";
import { HtmlParserImpl } from "./parser/htmlParser.ts";
import { JsonParserImpl } from "./parser/jsonParser.ts";
import { WatchPageHandlerImpl } from "./parser/watchPagehandler.ts";
import { LoggerImpl } from "../lib/io/log.ts";
import { WatchPageANalyzerImpl } from "./analyzers/watchPageAnalyzer.ts";
import { APIFetcherImpl } from "./watchAPI/apiFetcher.ts";
import { APIDataConverterImpl } from "./watchAPI/apiDataConverter.ts";
import { APIHandlerImpl } from "./watchAPI/apiHandler.ts";
import { DataComposerImpl } from "./session/data/dataComposer.ts";
import { SessionEnsureImpl } from "./session/ensure/sessionEnsure.ts";
import { SessionHandler } from "./session/sessionHanldler.ts";
import { NiconicoSessionInfo } from "../@types/net/hooks/types/niconicoSessionInfo.d.ts";

main();

function main() {
  const output = new OutputHandler();
  const logger = new LoggerImpl();

  if (output.canUse) {
    application.hooks?.registerPageAnalyzeFunction((content) => {
      const handler = new WatchPageHandlerImpl(
        new HtmlParserImpl(),
        new JsonParserImpl(),
      );
      const converter = new DataConverterImpl();
      const analyzer = new WatchPageANalyzerImpl(handler, converter);

      const result: AttemptResult<DmcInfo> = analyzer.analyze(content);

      if (!result.isSucceeded || result.data === null) {
        const message =
          `視聴ページの解析に失敗しました。(詳細:${result.message}, 例外:${result.exception?.message})`;
        output.write(message);
        logger.error(message);
        throw new Error();
      }

      return result.data;
    });

    application.hooks?.registerVideoInfoFunction(async (videoID, trackID) => {
      const fetcher = new APIFetcherImpl();
      const converter = new APIDataConverterImpl();
      const handler = new APIHandlerImpl(converter, fetcher);

      const result: AttemptResult<DmcInfo> = await handler.GetVideoInfo(
        videoID,
        trackID,
      );

      if (!result.isSucceeded || result.data === null) {
        const message =
          `視聴ページの解析に失敗しました。(詳細:${result.message})`;
        output.write(message);
        logger.error(message);
        throw new Error();
      }
      return result.data;
    });

    output.write("ページ解析機能の初期化が完了しました。");

    application.hooks?.registerSessionEnsuringFunction(async (info) => {
      const composer = new DataComposerImpl();
      const session = new SessionEnsureImpl();
      const handler = new SessionHandler(composer, session);

      const result: AttemptResult<NiconicoSessionInfo> =
        info.DmsInfo.accessRightKey === ""
          ? await handler.EnsureSession(info.SessionInfo)
          : await handler.GetAccessRight(info);

      if (!result.isSucceeded || result.data === null) {
        const message =
          `セッションの確立に失敗しました。(詳細:${result.message})`;
        output.write(message);
        logger.error(message);
        throw new Error();
      }

      return result.data;
    });

    output.write("セッション確立機能の初期化が完了しました。");
  }
}
