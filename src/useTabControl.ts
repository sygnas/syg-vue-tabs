/**
 * タブグループが管理しているアクティブIDを一括管理する
 */
import { ref, computed, watch } from 'vue';
import { TTabEventType, TTabGroup } from './types';

const EV_CHANGE: TTabEventType = 'change';
const EV_CLICK: TTabEventType = 'click';
const tabGroups = ref<TTabGroup[]>([]);

/**
 * タブグループを取得
 * なければ新規作成
 */
const $_getGroup = (groupId: string): TTabGroup => {
  const group = tabGroups.value.find((group: TTabGroup) => group.groupId === groupId);
  if (group) return group;

  // タブグループを登録
  const newGroup = {
    groupId,
    activeId: '',
    tabIdList: [],
    events: new EventTarget(),
  };
  tabGroups.value.push(newGroup);

  return tabGroups.value.find((group: TTabGroup) => group.groupId === groupId) as TTabGroup;
};

/**
 * タブグループ毎のコントローラーを生成
 * @param groupId タブグループ名
 * @param isMaster vue-tabs.vue 以外は指定しない。マスターデータか。
 * @param useHash vue-tabs.vue 以外は指定しない。location.hash を変更するか
 * @returns
 */
export function useTabControl(groupId: string, isMaster = false, useHash = false) {
  return (() => {
    const $_group: TTabGroup = $_getGroup(groupId);

    /***
     * アクティブなタブIDを取得
     */
    const activeId = computed(() => {
      return $_group.activeId;
    });

    /**
     * 現在アクティブなタブIDのindex（何番目か）を取得
     */
    const activeIndex = computed((): number => {
      return $_group.tabIdList.indexOf($_group.activeId);
    });

    /**
     * 指定IDのタブをアクティブにする
     * @param activeId string タブID
     * @param isTabClick boolean タブボタンから実行する時だけ true
     */
    const setActiveId = (activeId: string, isTabClick = false): void => {
      $_group.activeId = activeId;

      // タブボタンをクリックされて呼び出されたなら通知する
      if (isTabClick) {
        const event = new CustomEvent(EV_CLICK, { detail: activeId });
        $_group.events.dispatchEvent(event);
      }
    };

    /**
     * タブIDリストを登録
     * @param idList string[]
     */
    const setTabIdList = (idList: string[]) => {
      $_group.tabIdList = idList;
    };

    /**
     * 次のタブをアクティブにする
     */
    const changeNextTab = () => {
      const nextIndex = (activeIndex.value + 1) % $_group.tabIdList.length;
      setActiveId($_group.tabIdList[nextIndex]);
    };

    /**
     * 前のタブをアクティブにする
     */
    const changePrevTab = () => {
      const index = activeIndex.value - 1;
      const prevIndex = index <= -1 ? $_group.tabIdList.length - 1 : index;
      setActiveId($_group.tabIdList[prevIndex]);
    };

    /**
     * アクティブタブ変更時のリスナーを登録する
     * @param func (ev) => void
     */
    const addChangeListener = (func: EventListenerOrEventListenerObject) => {
      $_group.events.addEventListener(EV_CHANGE, func);
    };

    /**
     * クリックのリスナーを登録
     * @param func (ev) => void
     */
    const addClickListener = (func: EventListenerOrEventListenerObject) => {
      $_group.events.addEventListener(EV_CLICK, func);
    };

    // アクティブIDの監視
    watch(activeId, () => {
      // 変更を通知
      if (isMaster) {
        const event = new CustomEvent(EV_CHANGE, { detail: activeId.value });
        $_group.events.dispatchEvent(event);
      }

      // urlにハッシュを付ける
      if (useHash && isMaster) {
        location.hash = activeId.value;
      }
    });

    return {
      activeId,
      activeIndex,
      setActiveId,
      setTabIdList,
      changeNextTab,
      changePrevTab,
      addChangeListener,
      addClickListener,
    };
  })();
}
