// 分享信息模型
interface ShareInfo {
  share_id: string;
  share_name: string;
  share_status: number;
  share_time: number;
  user: {
    nick_name: string;
    image: {
      uri: string;
      tiny_url: string;
      origin_url: string;
    };
  };
  message_index_end: number;
  message_index_list: number[];
  review_status: number;
  share_type: number;
  enable_create_conversation: boolean;
  share_visibility: number;
}

// 消息快照中的消息项模型
interface MessageItem {
  conversation_id: string | null;
  section_id: string | null;
  message_id: string;
  index: number;
  reply_id: string;
  status: number;
  create_time: number;
  message_type: number;
  content_type: number;
  content: string;
  ext: {
    archive_state: string;
    auto_create_creation: string;
    // 其他字段按需补充
    [key: string]: any;
  };
  tts_content: string;
  meta_infos: any | null;
  applet_payload: any | null;
  user_type: number;
}

// 消息快照模型
interface MessageSnapshot {
  message_list: MessageItem[];
}

// 线程页面数据模型
interface ThreadPageData {
  share_info: ShareInfo;
  message_snapshot: MessageSnapshot;
}

// 加载器数据模型
interface LoaderData {
  thread_layout: null;
  "thread_(token)/layout": null;
  "thread_(token)/page": {
    isMobileShareId: boolean;
    isWebCollectionShareId: boolean;
    data: ThreadPageData;
  };
}

// 整体输出数据模型
interface OutputData {
  loaderData: LoaderData;
}

export { OutputData ,MessageItem};
