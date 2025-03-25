import { View } from "@common-module/app";
import { introView } from "../../../pages/introView.js";
import Layout from "./Layout.js";

export default class TestView extends View {
  constructor() {
    super();
    Layout.content = this.container = introView();
  }
}
