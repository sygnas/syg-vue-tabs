<template>
  <a
    :target="isBlank ? '_blank' : ''"
    :rel="isBlank ? 'noopener noreferrer' : ''"
    :href="href"
    :class="classLink"
    :data-active="isActive ? 'true' : ''"
    @click="clickLink"
  >
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    // 現在アクティブな識別子
    nowId: {
      type: String,
      default() {
        return '';
      },
    },
    // タブ切り替え対象のターゲット識別子
    id: {
      type: String,
      default() {
        return '';
      },
    },
    // url（外部リンクの場合）
    href: {
      type: String,
      default() {
        return '';
      },
    },
    // 別窓開くか
    isBlank: {
      type: Boolean,
      default() {
        return false;
      },
    },
    // リンク class
    classLink: {
      type: String,
      default() {
        return 'c-tabmenu__link';
      },
    },
  },
  computed: {
    isActive() {
      // 外部リンクはアクティブ状態にならない
      if (this.href) return false;
      // 現在のアクティブIDと、自分のIDが同じならアクティブ
      if (this.nowId === this.id) return true;
      return false;
    },
  },
  methods: {
    /**
     * クリックしたら発火
     * 外部リンクなら無視。
     * 自分の所有IDを返す。
     */
    clickLink(e) {
      if (this.href) return true;
      this.$emit('click', this.id);
      e.preventDefault();
    },
  },
};
</script>
