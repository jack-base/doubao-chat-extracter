import * as vscode from "vscode";
import { doubaoChatExtracter } from "./provider/doubaoChatExtracter";

export function activate(context: vscode.ExtensionContext) {
  let disposable = [
    vscode.commands.registerCommand(
      "doubao-chat-extracter.doubaoChatExtracter",
      doubaoChatExtracter
    )
  ];
  context.subscriptions.push(...disposable);
}

export function deactivate() {}
