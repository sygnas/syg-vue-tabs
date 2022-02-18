/**
 * タブグループが管理しているアクティブIDを一括管理する
 */
import { ref } from 'vue';

type TTabGroup = {
  groupId: string;
  activeId: string;
};

const tabGroups = ref<TTabGroup[]>([]);

/**
 * タブグループを取得
 */
const $_getGroup = (groupId: string) => {
  return tabGroups.value.find((group) => group.groupId === groupId);
};

const getActiveId = (groupId: string) => {
  const group = $_getGroup(groupId);
  return group ? group.activeId : '';
};

const setActiveId = (groupId: string, activeId: string) => {
  const group = $_getGroup(groupId);

  if (!group) {
    tabGroups.value.push({
      groupId,
      activeId,
    });
    return;
  }
  group.activeId = activeId;
};

export { getActiveId, setActiveId };
