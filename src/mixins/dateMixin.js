export const dateMixin = {
  methods: {
    formatDate(sateString) {
      const date = new Date(dateString);
      const options = { day: "numeric", year: "numeric", month: "long" };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    },
  },
};
