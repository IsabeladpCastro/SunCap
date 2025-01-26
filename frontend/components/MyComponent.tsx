import * as React from "react";
import ImageBlock from "./ImageBlock";
import IntroText from "./IntroText";
import Features from "./Features";
import StartButton from "./StartButton";

const MyComponent: React.FC = () => (
  <div className="flex overflow-hidden flex-col items-center pb-2 mx-auto w-full bg-white rounded-3xl max-w-[480px]">
    <ImageBlock
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/383e796f91b1fbda684fb3ddfff89c14a98711e3c14155de26cd5b2d198c2164?apiKey=3ee90a69bb854614b8f91637398ad82b&"
      alt="Main image"
      className="object-contain self-stretch w-full aspect-[8.85]"
    />
    <IntroText />
    <Features />
    <StartButton />
    <div className="flex shrink-0 mt-14 bg-black h-[5px] rounded-[100px] w-[134px]" />
  </div>
);

export default MyComponent;
