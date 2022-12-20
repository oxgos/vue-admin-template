import anime from "animejs";
import type { DirectiveBinding } from "vue";

export const vNumber = (el: HTMLElement, binding: DirectiveBinding<number>) => {
  const { value } = binding;
  const battery = {
    value: "0",
  };

  anime({
    targets: battery,
    value: value,
    round: 1,
    easing: "linear",
    update: function () {
      el.innerHTML = battery.value;
    },
  });
};
