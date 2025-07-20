import { OutputData } from "../../model/chat";
export function getMessageListFromHTML(html: string): OutputData | null {
  // <script>window._ROUTER_DATA =(.*?)</script>
  const regex = /<script>window\._ROUTER_DATA = (.*?)<\/script>/s;
  const match = html.match(regex);
  return match
    ? JSON.parse(match[1]).loaderData["thread_(token)/page"].data
        .message_snapshot.message_list
    : null;
}
