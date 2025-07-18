import { HarReplayer } from "../utils/har-replayer";
import * as vscode from "vscode";

export class GetHTMLService { 

    private replayer: HarReplayer;
    private URL: string = "https://www.doubao.com/thread/";

    constructor(URL: string) {
        this.replayer = new HarReplayer();
        this.URL = URL;
    }
    public async getHTML(url: string): Promise<string> { 
        this.replayer.init(vscode.extensions.getExtension("jack-base.zhihu-publisher-vscode")!.extensionPath+"/resource/getHTML.har");
        this.replayer.modifyRequest(0,{
            url: url,
            method: "GET",
        });

        const response = (await this.replayer.replayRequestByIndex(0)).replayedResponse;

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Failed to fetch HTML: ${response.status} ${response.statusText}`);
        }
    }
}