import axios from "axios";
import { defineStore } from "pinia";

export const useReportStore = defineStore('report', {
  state: () => ({
    reprotList: [],
  }),
  actions: {
    async register(report, idx) {
      const response = await axios.post("/api/reprot/create",
        {
          message: report.message,
          productIdx: idx
        }
      );
      return response;
    },
  }
})