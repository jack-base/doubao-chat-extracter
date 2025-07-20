import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { GetChatHTMLService } from "../service/getChatHTML";
import { getMessageListFromHTML, formatMessage } from "../utils/preprocess";

export const doubaoChatExtracter = async (uri: vscode.Uri) => {
  try {
    // Get file and workspace information
    const mdFilePath = uri.fsPath;
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);

    if (!workspaceFolder) {
      vscode.window.showErrorMessage("Cannot determine workspace folder");
      return;
    }

    const mdFileRelativePath = path.relative(
      workspaceFolder.uri.fsPath,
      mdFilePath
    );

    const inputDoubaoChatLink = await vscode.window.showInputBox({
      prompt: "Please enter the Doubao chat link",
    });
    if (!inputDoubaoChatLink) {
      vscode.window.showErrorMessage("No Doubao chat link provided");
      return;
    }

    const inputMarkdownFileName = await vscode.window.showInputBox({
      prompt: "Please enter the name of the chat file",
      value: inputDoubaoChatLink.split("/").pop() + ".md",
    });
    if (!inputMarkdownFileName) {
      vscode.window.showErrorMessage("No Markdown file name provided");
      return;
    }

    const chatHTML = await new GetChatHTMLService().getHTML(
      inputDoubaoChatLink
    );
    const chatData = getMessageListFromHTML(chatHTML);

    if (!chatData) {
      vscode.window.showErrorMessage("Failed to extract chat data from HTML");
      return;
    }

    const tts = chatData
      .map((message: { tts_content: any }) => message.tts_content)
      .join("\n\n\n");

    const fmt = formatMessage(tts);

    try {
      fs.writeFileSync(path.join(mdFilePath, inputMarkdownFileName), fmt);
    } catch (error) {
      vscode.window.showErrorMessage(
        `Failed to write to file: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      return;
    }
  } catch (error) {
    vscode.window.showErrorMessage(`Error: ${error}`);
  }
};
/**
 * Extract article ID from Zhihu article URL
 * @param url - Zhihu article URL
 * @returns Article ID
 */
function extractArticleId(url: string): string {
  const parts = url.split("/");
  return parts[parts.length - 1];
}
