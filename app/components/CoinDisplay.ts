import {
  ArcRotateCamera,
  Color3,
  Color4,
  Engine,
  HemisphericLight,
  MeshBuilder,
  MultiMaterial,
  Scene,
  StandardMaterial,
  SubMesh,
  Texture,
  Vector3,
} from "@babylonjs/core";
import { DomNode } from "@common-module/app";

export default class CoinDisplay extends DomNode<HTMLCanvasElement> {
  private engine!: Engine;
  private scene!: Scene;

  constructor() {
    super("canvas");

    let size = "320px";

    if (window.innerWidth < 768) {
      size = "200px";
    }

    this.style({
      width: size,
      height: size,
      outline: "none",
      WebkitTapHighlightColor: "transparent",
    });

    this.on("visible", () => {
      this.engine = new Engine(this.htmlElement, true);
      this.scene = new Scene(this.engine);
      this.scene.clearColor = new Color4(0, 0, 0, 1);

      const camera = new ArcRotateCamera(
        "camera",
        0,
        Math.PI / 2.5,
        3,
        new Vector3(0, 0, 0),
        this.scene,
      );

      camera.inputs.removeByType("ArcRotateCameraMouseWheelInput");
      camera.inputs.removeByType("ArcRotateCameraKeyboardMoveInput");

      camera.attachControl(this.htmlElement, true);

      const light = new HemisphericLight(
        "light",
        new Vector3(0, 1, 0),
        this.scene,
      );
      light.intensity = 0.7;

      this.createCoin();
      this.animate();
    });
  }

  private createCoin(): void {
    const tessellation = 64;

    const coin = MeshBuilder.CreateCylinder(
      "coin",
      {
        height: 0.2,
        diameter: 2,
        tessellation: tessellation,
      },
      this.scene,
    );

    const coinMaterialFaces = new StandardMaterial(
      "coinMaterialFaces",
      this.scene,
    );
    coinMaterialFaces.diffuseColor = new Color3(0.2, 0.2, 0.2);
    coinMaterialFaces.specularColor = new Color3(0.3, 0.3, 0.3);
    coinMaterialFaces.roughness = 0.2;

    const logoTexture = new Texture("/images/logo.png", this.scene);
    coinMaterialFaces.emissiveTexture = logoTexture;

    const coinMaterialEdge = new StandardMaterial(
      "coinMaterialEdge",
      this.scene,
    );
    coinMaterialEdge.diffuseColor = new Color3(0.2, 0.2, 0.2);
    coinMaterialEdge.specularColor = new Color3(0.3, 0.3, 0.3);
    coinMaterialEdge.roughness = 0.2;

    const coinMultiMaterial = new MultiMaterial(
      "coinMultiMaterial",
      this.scene,
    );
    coinMultiMaterial.subMaterials.push(coinMaterialFaces);
    coinMultiMaterial.subMaterials.push(coinMaterialEdge);

    coin.material = coinMultiMaterial;

    const verticesCount = coin.getTotalVertices();

    const sideIndicesCount = tessellation * 6;
    const capIndicesCount = tessellation * 3;

    coin.subMeshes = [];
    new SubMesh(1, 0, verticesCount, 0, sideIndicesCount, coin);
    new SubMesh(0, 0, verticesCount, sideIndicesCount, capIndicesCount, coin);
    new SubMesh(
      0,
      0,
      verticesCount,
      sideIndicesCount + capIndicesCount,
      capIndicesCount,
      coin,
    );

    coin.rotation.x = -Math.PI / 2;
    coin.rotation.y = -Math.PI;
  }

  private animate(): void {
    this.engine.runRenderLoop(() => {
      const coin = this.scene.getMeshByName("coin");
      if (coin) coin.rotation.y += 0.005;
      this.scene.render();
    });
  }

  public remove(): void {
    this.engine.stopRenderLoop();
    this.engine.dispose();
    super.remove();
  }
}
