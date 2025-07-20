// import { extensionPath } from "../const/PATH";
import fs from "fs";
import { HarReplayer } from "../../utils/harReplayer";
import path from "path";
// import * as vscode from "vscode";
// import { extensionPath } from "../const/PATH";
let extensionPath = path.resolve(__dirname, "../../");

export class GetChatHTMLService {
  private replayer: HarReplayer;
  private URL: string = "https://www.doubao.com/thread/w9b2081919b58cb7b";

  constructor() {
    this.replayer = new HarReplayer();
  }
  public async getHTML(url: string): Promise<string> {
    this.replayer.init(path.join(extensionPath, "resource/getChatHTML.har"));
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

if (require.main === module) {
  const service = new GetChatHTMLService();
  service
    .getHTML("https://www.doubao.com/thread/w9b2081919b58cb7b")
    .then((html) =>
      fs.writeFileSync(path.join(extensionPath, "output.html"), html)
    )
    .catch((err) => console.error(err));
}
