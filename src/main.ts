import { Response } from "../@types/net/http/fetch/Response";
import { DmcinfoImpl } from "../lib/net/types/impl/dmcinfo";
import { OutputHandler } from "../lib/output/output";

main();
async function main() {

    const logger = new OutputHandler();
    if (logger.canUse) {
        logger.write("Hello World!!");

        application.hooks?.registerPageAnalyzeFunction(content => {
            const info = new DmcinfoImpl();
            info.Title = "テストです";
            info.UploadedOn = new Date();
            return info;
        });
    }

}

