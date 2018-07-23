// Note that the bitwise operators and shift operators operate on 32-bit ints
// so in that case, the max safe integer is 2^31-1, or 2147483647
const VERY_LARGE_NUMBER = 2147483647;

Component({
  properties: {
    size: {
      type: String,
      value: 'small'
    },
    stepper: {
      type: Number,
      value: 1
    },
    min: {
      type: Number,
      value: 1
    },
    max: {
      type: Number,
      value: VERY_LARGE_NUMBER
    },
    step: {
      type: Number,
      value: 1
    }
  },

  methods: {
    handleZanStepperChange(e, type) {
      const { dataset = {} } = e.currentTarget;
      const { disabled } = dataset;
      const { step } = this.data;
      let { stepper } = this.data;

      if (disabled) return null;

      if (type === 'minus') {
        stepper -= step;
      } else if (type === 'plus') {
        stepper += step;
      }

      if (stepper < this.data.min || stepper > this.data.max) return null;

      this.triggerEvent('change', stepper);
      this.triggerEvent(type);
    },

    handleZanStepperMinus(e) {
      this.handleZanStepperChange(e, 'minus');
    },

    handleZanStepperPlus(e) {
      this.handleZanStepperChange(e, 'plus');
    },

    handleZanStepperBlur(e) {
      let { value } = e.detail;
      const { min, max } = this.data;

      if (!value) {
        setTimeout(() => {
          this.triggerEvent('change', min);
        }, 16);
        return;
      }

      value = +value;
      if (value > max) {
        value = max;
      } else if (value < min) {
        value = min;
      }

      this.triggerEvent('change', value);
    }
  }
});
