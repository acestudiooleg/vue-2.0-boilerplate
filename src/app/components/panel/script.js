/* ============
 * panel Component
 * ============
 * https://vuejs.org/v2/guide/components.html
 */

import SlotMixin from '@/mixins/slot';

export default {
  mixins: [
    SlotMixin,
  ],
  props: {
    contextualStyle: {
      type: String,
      required: false,
    },
  },
  computed: {
    classNames() {
      const classNames = ['panel'];

      if (this.contextualStyle) {
        classNames.push(`panel-${this.contextualStyle}`);
      } else {
        classNames.push('panel-default');
      }

      return classNames;
    },
  },
};
