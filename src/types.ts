// イベントタイプ
type TTabEventType = 'change' | 'click';

// タブグループ
type TTabGroup = {
  groupId: string;
  activeId: string;
  tabIdList: string[];
  intervalId: number;
  events: EventTarget;
};

export type { TTabEventType, TTabGroup };
