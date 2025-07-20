import { OutputData ,MessageItem} from "../model/chat";
export function getMessageListFromHTML(html: string): MessageItem[] | null {
  // <script>window._ROUTER_DATA =(.*?)</script>
  const regex = /<script>window\._ROUTER_DATA = (.*?)<\/script>/s;
  const match = html.match(regex);
  return match
    ? JSON.parse(match[1]).loaderData["thread_(token)/page"].data
        .message_snapshot.message_list
    : null;
}

export function formatMessage(message:string
): string {
  // replace \( \) with $ $
const regex = /\\\((.*?)\\\)/sg;
message = message.replace(regex, (match,p1) => {
  return `$${p1}$`;
});
  // replace \[ \] with $$ $$
  const regex2 = /\\\[(.*?)\\\]/sg;
  message = message.replace(regex2, (match,p1) => {
    return `$$\n${p1}\n$$`;
  });
  return message;
}