import * as vscode from "vscode";
import { doubaoChatExtracter } from "./provider/doubaoChatExtracter";

export function activate(context: vscode.ExtensionContext) {
  let disposable = [
    vscode.commands.registerCommand(
      "zhihu-publisher-vscode.doubaoChatExtracter",
      doubaoChatExtracter
    )
  ];
  context.subscriptions.push(...disposable);
}

export function deactivate() {}
