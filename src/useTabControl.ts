/**
 * タブグループが管理しているアクティブIDを一括管理する
 */
import { ref, computed, watch } from 'vue';

type TTabGroup = {
  groupId: string;
  activeId: string;
  tabIdList: string[];
};

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
  };
  tabGroups.value.push(newGroup);
  return tabGroups.value.find((group: TTabGroup) => group.groupId === groupId) as TTabGroup;
};

/**
 * タブグループ毎のコントローラーを生成
 * @param groupId タブグループ名
 * @param useHash アクティブIDを location.hash に反映するか
 * @returns
 */
export function useTabControl(groupId: string, useHash: boolean = false) {
  return (() => {
    const $_group: TTabGroup = $_getGroup(groupId);
    // eslint-disable-next-line
    let $_onChange = (id: string) => {};

    // アクティブなタブIDを取得
    const activeId = computed(() => {
      return $_group.activeId;
    });

    // アクティブなタブIDを登録
    const setActiveId = (activeId: string): void => {
      $_group.activeId = activeId;
    };

    // 現在アクティブなタブIDのindexを取得
    const activeIndex = computed((): number => {
      return $_group.tabIdList.indexOf($_group.activeId);
    });

    // タブIDリストを登録
    const setTabIdList = (idList: string[]) => {
      $_group.tabIdList = idList;
    };

    // 次のタブをアクティブにする
    const changeNextTab = () => {
      const nextIndex = (activeIndex.value + 1) % $_group.tabIdList.length;
      setActiveId($_group.tabIdList[nextIndex]);
    };

    // 前のタブをアクティブにする
    const changePrevTab = () => {
      const index = activeIndex.value - 1;
      const prevIndex = index <= -1 ? $_group.tabIdList.length - 1 : index;
      setActiveId($_group.tabIdList[prevIndex]);
    };

    // アクティブIDの監視
    watch(activeId, () => {
      // 変更を通知
      $_onChange(activeId.value);

      // urlにハッシュを付ける
      if (useHash) {
        location.hash = activeId.value;
      }
    });

    return {
      activeId,
      setActiveId,
      activeIndex,
      setTabIdList,
      changeNextTab,
      changePrevTab,
      // タブの変更を受け取る関数を登録
      set onChange(func: (id: string) => void) {
        $_onChange = func;
      },
    };
  })();
}
