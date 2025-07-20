import { HarReplayer } from "../utils/harReplayer";
import * as vscode from "vscode";
import { extensionPath } from "../const/PATH";
import path from "path";

export class GetChatHTMLService {
  private replayer: HarReplayer;

  constructor() {
    this.replayer = new HarReplayer();
  }
  public async getHTML(url: string): Promise<string> {
    this.replayer.init(path.join(extensionPath , "src/resource/getChatHTML.har"));
    this.replayer.modifyRequest(0, {
      url: url,
      method: "GET",
    });

    const response = (await this.replayer.replayRequestByIndex(0))
      .replayedResponse;

    if (response?.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Failed to fetch HTML: ${response?.status} ${response?.statusText}`
      );
    }
  }
}
