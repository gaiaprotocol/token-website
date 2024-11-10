import { DomNode, QueriedDomNode, Router } from "@common-module/app";

class Layout {
  private contentContainer = new QueriedDomNode(".layout main");

  public set content(content: DomNode) {
    this.contentContainer.clear();
    this.contentContainer.htmlElement.innerHTML = "";
    this.contentContainer.append(content);
  }

  public init() {
    new QueriedDomNode(".layout header a.gaia-protocol-logo").onDom(
      "click",
      (event) => {
        event.preventDefault();
        Router.go("/");
      },
    );

    new QueriedDomNode(".layout header a.faucet").onDom(
      "click",
      (event) => {
        event.preventDefault();
        Router.go("/faucet");
      },
    );
  }
}

export default new Layout();
