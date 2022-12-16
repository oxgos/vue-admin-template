<template>
  <div class="dashboard">
    <a-row :gutter="58" style="margin-bottom: 10">
      <a-col
        class="gutter-row"
        :span="6"
        lg="6"
        sm="12"
        xs="12"
        v-for="item in cradList"
        :key="item.title"
      >
        <v-card
          v-bind="item"
          @changeChartDataType="changeChartDataType"
        ></v-card>
      </a-col>
    </a-row>
    <div :style="{ marginTop: '10px' }">
      <line-chart v-bind="lineChartSource"></line-chart>
    </div>
    <div class="chart-group">
      <a-row :gutter="32">
        <a-col :gutter="12" :xs="24" :sm="24" :lg="8">
          <div class="chart-item">
            <RaddarChart />
          </div>
        </a-col>
        <a-col :gutter="12" :xs="24" :sm="24" :lg="8">
          <div class="chart-item">
            <PieChart />
          </div>
        </a-col>
        <a-col :gutter="12" :xs="24" :sm="24" :lg="8">
          <div class="chart-item">
            <BarChart />
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="table-group">
      <div class="table-group-left">
        <OrderTable />
      </div>
      <div class="table-group-right">
        <CardBox />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref } from "vue";
import VCard from "@/components/VCard/index.vue";
import LineChart from "./components/LineChart/index.vue";
import RaddarChart from "./components/RaddarChart/index.vue";
import PieChart from "./components/PieChart/index.vue";
import BarChart from "./components/BarChart/index.vue";
import OrderTable from "./components/OrderTable/index.vue";
import CardBox from "./components/CardBox/index.vue";

interface LineChartItemData {
  expectedData: number[];
  actualData: number[];
}

type LineChartData = Record<string, LineChartItemData>;

interface CradListItem {
  title: string;
  icon: string;
  num: number;
  color: string;
}

const cradList: CradListItem[] = [
  {
    title: "New Visits",
    icon: "UserOutlined",
    num: 102400,
    color: "#40c9c6",
  },
  {
    title: "Messages",
    icon: "CommentOutlined",
    num: 81212,
    color: "#36a3f7",
  },
  {
    title: "Purchases",
    icon: "DollarCircleOutlined",
    num: 9280,
    color: "#f4516c",
  },
  {
    title: "Shoppings",
    icon: "ShoppingCartOutlined",
    num: 13600,
    color: "#f6ab40",
  },
];

const lineChartData: LineChartData = {
  "New Visits": {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  Messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  Purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  Shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
};

export default defineComponent({
  setup() {
    const lineChartDataType = ref<string>("New Visits");
    const lineChartSource: ComputedRef<LineChartItemData> = computed(() => {
      return lineChartData[lineChartDataType.value];
    });

    const changeChartDataType = (type: string) => {
      lineChartDataType.value = type;
    };

    return {
      cradList,
      lineChartSource,
      changeChartDataType,
    };
  },
  components: {
    VCard,
    LineChart,
    RaddarChart,
    BarChart,
    PieChart,
    OrderTable,
    CardBox,
  },
});
</script>

<style lang="less" scoped>
.dashboard {
  padding: 20px;
  .chart-group,
  .table-group {
    margin-top: 10px;
  }
  .chart-group {
    .chart-item {
      background-color: #fff;
    }
  }
  .table-group {
    display: flex;
    .table-group-left,
    .table-group-right {
      flex: 0 0 50%;
    }
  }
}
</style>
