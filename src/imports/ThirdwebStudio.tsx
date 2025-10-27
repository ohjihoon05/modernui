import svgPaths from "./svg-tweuht5vfr";
import imgDiv from "figma:asset/e1addd74cdb02adcbf31b8c1c786af8a878d9446.png";
import imgLogoA16ZPng from "figma:asset/edd517e082bf2ce7195b01e9d537b27fa5c4725e.png";
import imgDiv1 from "figma:asset/c795d6e12cab76855c89e1c4b236c476a40dd707.png";
import imgCasestudy01Jpg from "figma:asset/70a909e8f7ae0d9fe9bd02e7142d790b3ef7c03a.png";
import imgCasestudy03Jpg from "figma:asset/b95b6f5f24f6798a9628cb08feb1df3b4fa67f81.png";
import imgCasestudy02Jpg from "figma:asset/0f111cc66638eecd247e6bc5b75419fd4667a80f.png";
import imgCasestudy04Jpg from "figma:asset/3b2e78cfb6c994e03acfd8a14541837adea949d1.png";
import imgOther01Jpg from "figma:asset/980dd90941d61c4621dddd90073b3f416be2f4ce.png";
import imgOther03Jpg from "figma:asset/6777d050caf0cc9bdaa60c54b2498900f54e598d.png";
import imgOther04Jpg from "figma:asset/a48d54c848aab8e9403c36955f960ed01ee938a0.png";
import imgHelp01Jpg from "figma:asset/33c6f02b6187b1d91353b37ff77293a9579641f2.png";
import imgAbout01Jpg from "figma:asset/9b0f83b992fbdd6aa833600a48ad9f3400bb9988.png";
import imgAbout02Jpg from "figma:asset/60d48c2176df5c1bc28508b6650a2da844214bbd.png";
import imgAbout03Jpg from "figma:asset/e289a5853bbda9f55806e5fdb6a7d07ce85f31fa.png";

function Div() {
  return (
    <div className="absolute h-[102.234px] left-[115.19px] overflow-clip top-0 w-[622.828px]" data-name="div">
      <div className="absolute flex flex-col font-['Inter:Medium',_sans-serif] font-medium h-[100px] justify-center leading-[0] left-0 not-italic text-[94.8px] text-white top-[51px] translate-y-[-50%] w-[623.028px]">
        <p className="leading-[103.68px]">Design studio</p>
      </div>
    </div>
  );
}

function Div1() {
  return (
    <div className="absolute box-border content-stretch flex items-start left-[460.8px] overflow-clip pl-0 pr-[324.828px] py-0 top-[101.23px]" data-name="div">
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[93.8px] text-nowrap text-white">
        <p className="leading-[103.68px] whitespace-pre">for the</p>
      </div>
    </div>
  );
}

function Div2() {
  return (
    <div className="absolute box-border content-stretch flex items-start left-[230.39px] overflow-clip pl-0 pr-[91.828px] py-0 top-[203.47px]" data-name="div">
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[94.8px] text-nowrap text-white">
        <p className="leading-[103.68px] whitespace-pre">web3 world</p>
      </div>
    </div>
  );
}

function Div3() {
  return (
    <div className="absolute h-[300px] left-0 right-[817.17px] top-[255px]" data-name="div">
      <Div />
      <Div1 />
      <Div2 />
    </div>
  );
}

function ArrowBottomSvg() {
  return (
    <div className="absolute h-[39px] left-0 top-0 w-[40px]" data-name="arrow-bottom.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 39">
        <g id="arrow-bottom.svg">
          <path d="M20 38.3332V1.6665" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p572a80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function A() {
  return (
    <div className="absolute h-[39px] left-[24px] top-1/2 translate-y-[-50%] w-[40px]" data-name="a">
      <ArrowBottomSvg />
    </div>
  );
}

function Div4() {
  return (
    <div className="absolute bottom-[48px] left-0 right-0 top-[723px]" data-name="div">
      <A />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal inset-[-5.5px_982.14px_-5.5px_115.19px] justify-center leading-[0] not-italic text-[19px] text-[rgba(255,255,255,0.6)]">
        <p className="leading-[30px]">We help companies design their products to be ready for web3 world</p>
      </div>
    </div>
  );
}

function Div5() {
  return (
    <div className="absolute h-[810px] left-0 right-0 top-0" data-name="div">
      <div className="absolute bottom-[-129.59px] h-[810px] right-0 w-[1008px]" data-name="div">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[88.34%] left-0 max-w-none top-0 w-full" src={imgDiv} />
        </div>
      </div>
      <Div3 />
      <Div4 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute bottom-[0.12%] left-0 right-0 top-0" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 243 51">
        <g id="Group">
          <path d={svgPaths.p184f3b00} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p28ec2100} fill="var(--fill-0, black)" id="Vector_2" />
          <path d={svgPaths.p353adc80} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p2957330} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p2ec96900} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p34c63800} fill="var(--fill-0, white)" id="Vector_6" />
          <path d={svgPaths.p15cb3d80} fill="var(--fill-0, white)" id="Vector_7" />
          <path d={svgPaths.p15724600} fill="var(--fill-0, white)" id="Vector_8" />
          <path d={svgPaths.p1b1b4c00} fill="var(--fill-0, white)" id="Vector_9" />
          <path d={svgPaths.p24480a00} fill="var(--fill-0, white)" id="Vector_10" />
          <path d={svgPaths.p25bfd800} fill="var(--fill-0, white)" id="Vector_11" />
          <path d={svgPaths.p3b051f00} fill="var(--fill-0, white)" id="Vector_12" />
        </g>
      </svg>
    </div>
  );
}

function LogoYcombinatorSvg() {
  return (
    <div className="h-[50.203px] overflow-clip relative shrink-0 w-[242.36px]" data-name="logo-ycombinator.svg">
      <Group />
    </div>
  );
}

function LogoYcombinatorSvg1() {
  return (
    <div className="absolute box-border content-stretch flex items-start left-[40px] px-[0.023px] py-0 top-1/2 translate-y-[-50%]" data-name="logo-ycombinator.svg">
      <LogoYcombinatorSvg />
    </div>
  );
}

function LogoCoinbaseSvg() {
  return (
    <div className="h-[44px] relative shrink-0 w-[242px]" data-name="logo-coinbase.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 242 44">
        <g clipPath="url(#clip0_1_419)" id="logo-coinbase.svg">
          <path d={svgPaths.pf7e59e0} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_419">
            <rect fill="white" height="44" width="242" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LogoCoinbaseSvg1() {
  return (
    <div className="absolute content-stretch flex items-start left-[362.41px] top-[calc(50%-0.008px)] translate-y-[-50%]" data-name="logo-coinbase.svg">
      <LogoCoinbaseSvg />
    </div>
  );
}

function LogoBlockchangeSvg() {
  return (
    <div className="h-[76.172px] relative shrink-0 w-[242.365px]" data-name="logo-blockchange.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 243 77">
        <g id="logo-blockchange.svg">
          <path clipRule="evenodd" d={svgPaths.p2755f400} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function LogoBlockchangeSvg1() {
  return (
    <div className="absolute box-border content-stretch flex items-start left-[1007.22px] px-[0.021px] py-0 top-1/2 translate-y-[-50%]" data-name="logo-blockchange.svg">
      <LogoBlockchangeSvg />
    </div>
  );
}

function Div6() {
  return (
    <div className="absolute h-[138.516px] left-[75.19px] top-[143.19px] w-[1289.62px]" data-name="div">
      <LogoYcombinatorSvg1 />
      <LogoCoinbaseSvg1 />
      <div className="absolute h-[138.516px] left-[684.81px] top-1/2 translate-y-[-50%] w-[242.406px]" data-name="logo-a16z.png">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgLogoA16ZPng} />
        </div>
      </div>
      <LogoBlockchangeSvg1 />
    </div>
  );
}

function DivLogos() {
  return (
    <div className="absolute h-[378.891px] left-0 right-0 top-[810px]" data-name="div#logos">
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[20px] justify-center leading-[0] left-[115.19px] not-italic text-[19px] text-[rgba(255,255,255,0.6)] top-[112.19px] translate-y-[-50%] w-[244.966px]">
        <p className="leading-[30px]">Our clients are backed by:</p>
      </div>
      <Div6 />
    </div>
  );
}

function Div7() {
  return (
    <div className="absolute h-[245.188px] leading-[0] left-0 not-italic right-[720px] top-[288px]" data-name="div">
      <div className="absolute flex flex-col font-['Inter:Medium',_sans-serif] font-medium h-[36px] justify-center left-[115.19px] text-[34px] text-white top-[21px] translate-y-[-50%] w-[360.825px]">
        <p className="leading-[43.2px]">What is Web3 studio?</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[140px] justify-center left-[115.19px] text-[19px] text-[rgba(255,255,255,0.6)] top-[154.19px] translate-y-[-50%] w-[539.247px]">
        <p className="leading-[30px]">Things around crypto, NFTs and web3 as a whole are unbelievably interesting. Unfortunately, the overall usability as well as the quality of the UI is often still not up to the task. To achieve mass adoption, overcoming those hurdles will be key. And this is where our story begins.</p>
      </div>
    </div>
  );
}

function TextInfiniteSvg() {
  return (
    <div className="h-[217px] relative shrink-0 w-[594px]" data-name="text-infinite.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 594 217">
        <g clipPath="url(#clip0_1_351)" id="text-infinite.svg">
          <path d={svgPaths.p110b8300} id="Vector" stroke="url(#paint0_linear_1_351)" strokeLinecap="square" strokeMiterlimit="10" />
          <g id="Group" opacity="0.6">
            <path d={svgPaths.p82ef800} fill="var(--fill-0, white)" id="Vector_2" />
            <path d={svgPaths.p3848c100} fill="var(--fill-0, white)" id="Vector_3" />
            <path d={svgPaths.p2cae6a00} fill="var(--fill-0, white)" id="Vector_4" />
            <path d={svgPaths.p17217400} fill="var(--fill-0, white)" id="Vector_5" />
            <path d={svgPaths.p214c7c00} fill="var(--fill-0, white)" id="Vector_6" />
            <path d={svgPaths.p9cad400} fill="var(--fill-0, white)" id="Vector_7" />
            <path d={svgPaths.p16487300} fill="var(--fill-0, white)" id="Vector_8" />
            <path d={svgPaths.p68614f0} fill="var(--fill-0, white)" id="Vector_9" />
            <path d={svgPaths.p1b7e400} fill="var(--fill-0, white)" id="Vector_10" />
            <path d={svgPaths.p12d18200} fill="var(--fill-0, white)" id="Vector_11" />
            <path d={svgPaths.p38b1bb00} fill="var(--fill-0, white)" id="Vector_12" />
            <path d={svgPaths.p39031500} fill="var(--fill-0, white)" id="Vector_13" />
            <path d={svgPaths.p3af1ad00} fill="var(--fill-0, white)" id="Vector_14" />
            <path d={svgPaths.p3733b900} fill="var(--fill-0, white)" id="Vector_15" />
            <path d={svgPaths.p37875700} fill="var(--fill-0, white)" id="Vector_16" />
            <path d={svgPaths.p139d9780} fill="var(--fill-0, white)" id="Vector_17" />
            <path d={svgPaths.p3a519200} fill="var(--fill-0, white)" id="Vector_18" />
            <path d={svgPaths.p36185800} fill="var(--fill-0, white)" id="Vector_19" />
            <path d={svgPaths.p194e6680} fill="var(--fill-0, white)" id="Vector_20" />
            <path d={svgPaths.p3c9b8680} fill="var(--fill-0, white)" id="Vector_21" />
            <path d={svgPaths.p1333a700} fill="var(--fill-0, white)" id="Vector_22" />
            <path d={svgPaths.p121a2640} fill="var(--fill-0, white)" id="Vector_23" />
            <path d={svgPaths.p16991e00} fill="var(--fill-0, white)" id="Vector_24" />
            <path d={svgPaths.p6d2fd00} fill="var(--fill-0, white)" id="Vector_25" />
            <path d={svgPaths.p346dd400} fill="var(--fill-0, white)" id="Vector_26" />
            <path d={svgPaths.p70bb660} fill="var(--fill-0, white)" id="Vector_27" />
            <path d={svgPaths.p3515057e} fill="var(--fill-0, white)" id="Vector_28" />
          </g>
          <g id="Group_2" opacity="0.6">
            <path d={svgPaths.p2c5035f0} fill="var(--fill-0, white)" id="Vector_29" />
            <path d={svgPaths.p202fc300} fill="var(--fill-0, white)" id="Vector_30" />
            <path d={svgPaths.pb03e380} fill="var(--fill-0, white)" id="Vector_31" />
            <path d={svgPaths.p2a295b00} fill="var(--fill-0, white)" id="Vector_32" />
            <path d={svgPaths.p659300} fill="var(--fill-0, white)" id="Vector_33" />
            <path d={svgPaths.p4ef8930} fill="var(--fill-0, white)" id="Vector_34" />
            <path d={svgPaths.p36dc280} fill="var(--fill-0, white)" id="Vector_35" />
            <path d={svgPaths.pce46900} fill="var(--fill-0, white)" id="Vector_36" />
            <path d={svgPaths.p3a255700} fill="var(--fill-0, white)" id="Vector_37" />
            <path d={svgPaths.p34981280} fill="var(--fill-0, white)" id="Vector_38" />
            <path d={svgPaths.p17f72a80} fill="var(--fill-0, white)" id="Vector_39" />
            <path d={svgPaths.p33671e80} fill="var(--fill-0, white)" id="Vector_40" />
            <path d={svgPaths.p34ad4300} fill="var(--fill-0, white)" id="Vector_41" />
            <path d={svgPaths.p3d970700} fill="var(--fill-0, white)" id="Vector_42" />
            <path d={svgPaths.p3d88df00} fill="var(--fill-0, white)" id="Vector_43" />
            <path d={svgPaths.p2c214500} fill="var(--fill-0, white)" id="Vector_44" />
            <path d={svgPaths.p1a29de00} fill="var(--fill-0, white)" id="Vector_45" />
            <path d={svgPaths.p19264c00} fill="var(--fill-0, white)" id="Vector_46" />
            <path d={svgPaths.p230b5280} fill="var(--fill-0, white)" id="Vector_47" />
            <path d={svgPaths.p1ab5ba80} fill="var(--fill-0, white)" id="Vector_48" />
            <path d={svgPaths.p1b0cd700} fill="var(--fill-0, white)" id="Vector_49" />
            <path d={svgPaths.p236c1b00} fill="var(--fill-0, white)" id="Vector_50" />
            <path d={svgPaths.p16452380} fill="var(--fill-0, white)" id="Vector_51" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_351" x1="77" x2="543" y1="115" y2="109">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <clipPath id="clip0_1_351">
            <rect fill="white" height="217" width="594" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TextInfiniteSvg1() {
  return (
    <div className="absolute box-border content-stretch flex inset-[14.09px_5.41px] items-start px-[57.594px] py-0" data-name="text-infinite.svg">
      <TextInfiniteSvg />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute bottom-[0.72%] left-[8.75%] right-[8.96%] top-0" data-name="Group">
      <div className="absolute inset-[-0.23%_-0.08%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 594 217">
          <g id="Group">
            <path d={svgPaths.p11842600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="square" strokeMiterlimit="10" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute h-[217px] left-1/2 top-0 translate-x-[-50%] w-[720px]" data-name="Frame">
      <Group3 />
    </div>
  );
}

function Svg() {
  return (
    <div className="absolute h-[217px] left-0 overflow-clip right-0 top-[14.09px]" data-name="svg">
      <Frame />
    </div>
  );
}

function Div8() {
  return (
    <div className="absolute h-[245.188px] left-[720px] right-0 top-[288px]" data-name="div">
      <TextInfiniteSvg1 />
      <Svg />
    </div>
  );
}

function Div9() {
  return (
    <div className="absolute h-[821.188px] left-0 overflow-clip right-0 top-[1188.89px]" data-name="div">
      <div className="absolute h-[1009px] right-[-530px] top-[-120px] w-[830px]" data-name="div">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[98.69%] left-0 max-w-none top-0 w-full" src={imgDiv1} />
        </div>
      </div>
      <Div7 />
      <Div8 />
    </div>
  );
}

function Div10() {
  return (
    <div className="bg-black h-[36px] relative rounded-[50px] shrink-0 w-[126px]" data-name="div">
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[16px] justify-center leading-[0] left-[calc(50%+0.1px)] not-italic text-[16px] text-center text-white top-[18px] translate-x-[-50%] translate-y-[-50%] w-[98.044px]">
        <p className="leading-[24px]">coming soon</p>
      </div>
    </div>
  );
}

function Div11() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[12.188px] items-start left-[24px] pl-0 pr-[103px] py-0 top-[calc(50%-0.508px)] translate-y-[-50%]" data-name="div">
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[35px] text-nowrap text-white">
        <p className="leading-[43.2px] whitespace-pre">How we design web3 products</p>
      </div>
      <Div10 />
    </div>
  );
}

function Div12() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.1)] h-[172.797px] left-0 right-[12px] top-[887.2px]" data-name="div">
      <Div11 />
    </div>
  );
}

function Div13() {
  return (
    <div className="h-[1060px] relative shrink-0 w-[680px]" data-name="div">
      <div className="absolute h-[429.891px] left-0 top-[calc(50%-315.055px)] translate-y-[-50%] w-[668px]" data-name="casestudy-01.jpg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgCasestudy01Jpg} />
        </div>
      </div>
      <div className="absolute h-[409.312px] left-0 top-[calc(50%+128.547px)] translate-y-[-50%] w-[668px]" data-name="casestudy-03.jpg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgCasestudy03Jpg} />
        </div>
      </div>
      <Div12 />
    </div>
  );
}

function Div14() {
  return (
    <div className="h-[1078.28px] relative shrink-0 w-[680px]" data-name="div">
      <div className="absolute h-[677.547px] left-[12px] top-0 w-[668px]" data-name="casestudy-02.jpg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgCasestudy02Jpg} />
        </div>
      </div>
      <div className="absolute h-[352.734px] left-[12px] top-[calc(50%+338.773px)] translate-y-[-50%] w-[668px]" data-name="casestudy-04.jpg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgCasestudy04Jpg} />
        </div>
      </div>
    </div>
  );
}

function Div15() {
  return (
    <div className="absolute box-border content-stretch flex items-start left-0 px-[40px] py-0 top-[212px]" data-name="div">
      <Div13 />
      <Div14 />
    </div>
  );
}

function DivProjects() {
  return (
    <div className="absolute h-[1290.28px] left-0 right-0 top-[2125.27px]" data-name="div#projects">
      <div className="absolute flex flex-col font-['Inter:Medium',_sans-serif] font-medium h-[120px] justify-center leading-[0] left-[40px] not-italic text-[111px] text-white top-[72px] translate-y-[-50%] w-[434.731px]">
        <p className="leading-[144px]">Projects</p>
      </div>
      <Div15 />
    </div>
  );
}

function Div16() {
  return (
    <div className="absolute h-[348px] left-[-1464px] top-0 w-[7808px]" data-name="div">
      <div className="absolute h-[348px] left-[1464px] right-[5880px] top-0" data-name="other01.jpg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgOther01Jpg} />
        </div>
      </div>
      <div className="absolute h-[348px] left-[1952px] right-[5392px] top-0" data-name="other03.jpg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgOther03Jpg} />
        </div>
      </div>
      <div className="absolute h-[348px] left-[2440px] right-[4904px] top-0" data-name="other04.jpg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgOther04Jpg} />
        </div>
      </div>
    </div>
  );
}

function Div17() {
  return (
    <div className="absolute h-[348px] left-0 overflow-clip top-0 w-[1440px]" data-name="div">
      <Div16 />
    </div>
  );
}

function ArrowLeftWhiteSvg() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[38px]" data-name="arrow-left-white.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 40">
        <g id="arrow-left-white.svg">
          <path d={svgPaths.p168bbdf0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Previous() {
  return (
    <div className="h-[40px] relative shrink-0 w-[38px]" data-name="Previous">
      <ArrowLeftWhiteSvg />
    </div>
  );
}

function ArrowRightWhiteSvg() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[38px]" data-name="arrow-right-white.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 40">
        <g id="arrow-right-white.svg">
          <path d={svgPaths.pc9aed00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Next() {
  return (
    <div className="h-[40px] relative shrink-0 w-[38px]" data-name="Next">
      <ArrowRightWhiteSvg />
    </div>
  );
}

function Div18() {
  return (
    <div className="absolute box-border content-stretch flex gap-[20px] items-start left-[1320px] pb-0 pt-[17px] px-0 top-[372px]" data-name="div">
      <Previous />
      <Next />
    </div>
  );
}

function Div19() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[396px] w-[260px]" data-name="div">
      <div className="absolute bg-white h-[2px] left-[calc(50%-110px)] top-[15px] translate-x-[-50%] w-[40px]" data-name="span" />
      <div className="absolute bg-[rgba(255,255,255,0.3)] h-[2px] left-[calc(50%-70px)] top-[15px] translate-x-[-50%] w-[20px]" data-name="span" />
      <div className="absolute bg-[rgba(255,255,255,0.3)] h-[2px] left-[calc(50%-40px)] top-[15px] translate-x-[-50%] w-[20px]" data-name="span" />
      <div className="absolute bg-[rgba(255,255,255,0.3)] h-[2px] left-[calc(50%-10px)] top-[15px] translate-x-[-50%] w-[20px]" data-name="span" />
      <div className="absolute bg-[rgba(255,255,255,0.3)] h-[2px] left-[calc(50%+20px)] top-[15px] translate-x-[-50%] w-[20px]" data-name="span" />
      <div className="absolute bg-[rgba(255,255,255,0.3)] h-[2px] left-[calc(50%+50px)] top-[15px] translate-x-[-50%] w-[20px]" data-name="span" />
      <div className="absolute bg-[rgba(255,255,255,0.3)] h-[2px] left-[calc(50%+80px)] top-[15px] translate-x-[-50%] w-[20px]" data-name="span" />
      <div className="absolute bg-[rgba(255,255,255,0.3)] h-[2px] left-[calc(50%+110px)] top-[15px] translate-x-[-50%] w-[20px]" data-name="span" />
    </div>
  );
}

function Div20() {
  return (
    <div className="absolute bg-black h-[549px] left-0 right-0 top-[212px]" data-name="div">
      <Div17 />
      <Div18 />
      <Div19 />
    </div>
  );
}

function Div21() {
  return (
    <div className="absolute h-[761px] left-0 top-[3588.34px] w-[1440px]" data-name="div">
      <div className="absolute flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] left-[24px] not-italic text-[114px] text-nowrap text-white top-[72px] translate-y-[-50%]">
        <p className="leading-[144px] whitespace-pre">Other projects</p>
      </div>
      <Div20 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[15.98%_0.03%_15.84%_0.03%]" data-name="Group">
      <div className="absolute inset-[-0.1%_-0.03%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1600 401">
          <g id="Group">
            <path d={svgPaths.p100f0a80} id="Vector" stroke="var(--stroke-0, #353535)" strokeWidth="0.833319" />
            <path d={svgPaths.p1b776f80} id="Vector_2" stroke="var(--stroke-0, #353535)" strokeWidth="0.833319" />
            <path d={svgPaths.p20f00000} id="Vector_3" stroke="var(--stroke-0, #353535)" strokeWidth="0.833319" />
            <path d={svgPaths.p2f4f4a80} id="Vector_4" stroke="var(--stroke-0, #353535)" strokeWidth="0.833319" />
            <path d={svgPaths.p2c2e250} id="Vector_5" stroke="var(--stroke-0, #353535)" strokeWidth="0.833319" />
            <path d={svgPaths.p1fd62300} id="Vector_6" stroke="var(--stroke-0, #353535)" strokeWidth="0.833319" />
            <path d={svgPaths.p37801d00} id="Vector_7" stroke="var(--stroke-0, #353535)" strokeWidth="0.833319" />
            <path d={svgPaths.p23437580} id="Vector_8" stroke="var(--stroke-0, #353535)" strokeWidth="0.833319" />
            <path d={svgPaths.p9de0280} id="Vector_9" stroke="var(--stroke-0, #353535)" strokeWidth="0.833319" />
            <path d={svgPaths.pf7c6f80} id="Vector_10" stroke="var(--stroke-0, #353535)" strokeWidth="0.833319" />
            <path d={svgPaths.p350a6a00} id="Vector_11" stroke="var(--stroke-0, #353535)" strokeWidth="0.833319" />
            <path d={svgPaths.p20487300} id="Vector_12" stroke="var(--stroke-0, #353535)" strokeWidth="0.833319" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function DividerSvg() {
  return (
    <div className="absolute h-[586.656px] left-1/2 overflow-clip top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1599.97px]" data-name="divider.svg">
      <Group4 />
    </div>
  );
}

function DividerSvg1() {
  return (
    <div className="absolute h-[586.656px] left-[calc(50%+80px)] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1600px]" data-name="divider.svg">
      <DividerSvg />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute bottom-[21.47%] left-[-0.16%] right-0 top-[21.38%]" data-name="Group">
      <div className="absolute inset-[-0.1%_-0.03%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1604 404">
          <g id="Group">
            <path d="M0.416667 203.172H402.917" id="Vector" stroke="var(--stroke-0, white)" strokeDasharray="575 575" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.833333" />
            <path d="M403.75 402.338H802.917" id="Vector_2" stroke="var(--stroke-0, white)" strokeDasharray="575 575" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.833333" />
            <path d="M802.917 201.505H1202.92" id="Vector_3" stroke="var(--stroke-0, white)" strokeDasharray="575 575" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.833333" />
            <path d="M403.333 202.755V402.755" id="Vector_4" stroke="var(--stroke-0, white)" strokeDasharray="575 575" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.833333" />
            <path d="M803.333 201.922V402.755" id="Vector_5" stroke="var(--stroke-0, white)" strokeDasharray="575 575" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.833333" />
            <path d="M1403.33 1.92178V201.922" id="Vector_6" stroke="var(--stroke-0, white)" strokeDasharray="575 575" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.833333" />
            <path d="M1602.92 2.33844H1402.92" id="Vector_7" stroke="var(--stroke-0, white)" strokeDasharray="575 575" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.833333" />
            <path d={svgPaths.p12018010} id="Vector_8" stroke="var(--stroke-0, white)" strokeDasharray="575 575" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.833333" />
            <path d={svgPaths.p36630c00} id="Vector_9" stroke="var(--stroke-0, white)" strokeDasharray="575 575" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.833333" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute h-[704px] left-1/2 top-0 translate-x-[-50%] w-[1600px]" data-name="Frame">
      <Group5 />
    </div>
  );
}

function Svg1() {
  return (
    <div className="absolute h-[704px] left-0 overflow-clip top-[-60px] w-[1600px]" data-name="svg">
      <Frame1 />
    </div>
  );
}

function Div22() {
  return (
    <div className="absolute h-[586.656px] left-0 overflow-clip right-0 top-0" data-name="div">
      <DividerSvg1 />
      <Svg1 />
    </div>
  );
}

function ButtonVPillsHomeTab() {
  return (
    <div className="absolute box-border content-stretch flex items-start left-[-20px] pl-0 pr-[169.875px] py-[16px] rounded-[4px] top-0" data-name="button#v-pills-home-tab">
      <div className="absolute bg-white left-0 rounded-[4px] size-[8px] top-[39px]" data-name="button#v-pills-home-tab:before" />
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-nowrap text-white">
        <p className="leading-[54px] whitespace-pre">Product clarity</p>
      </div>
    </div>
  );
}

function DivVPillsTab() {
  return (
    <div className="absolute h-[258px] left-[115.19px] right-[926.94px] top-0" data-name="div#v-pills-tab">
      <ButtonVPillsHomeTab />
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[36px] justify-center leading-[0] left-0 not-italic text-[35px] text-[rgba(255,255,255,0.6)] top-[129px] translate-y-[-50%] w-[221.028px]">
        <p className="leading-[54px]">UX/UI design</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[36px] justify-center leading-[0] left-0 not-italic text-[35px] text-[rgba(255,255,255,0.6)] top-[215px] translate-y-[-50%] w-[286.841px]">
        <p className="leading-[54px]">Maintain process</p>
      </div>
    </div>
  );
}

function Ul() {
  return (
    <div className="absolute box-border content-stretch flex flex-col font-['Inter:Regular',_sans-serif] font-normal items-start leading-[0] left-0 not-italic pl-[20px] pr-[134.875px] py-0 text-[rgba(255,255,255,0.6)] text-nowrap top-[136px]" data-name="ul">
      <div className="flex flex-col justify-center relative shrink-0 text-[26px]">
        <p className="leading-[32px] text-nowrap whitespace-pre">{`product goal&vision`}</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[25px]">
        <p className="leading-[32px] text-nowrap whitespace-pre">brand voice</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[26px]">
        <p className="leading-[32px] text-nowrap whitespace-pre">product positioning</p>
      </div>
    </div>
  );
}

function Div23() {
  return (
    <div className="absolute h-[248px] left-[397.88px] right-0 top-[20px]" data-name="div">
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[90px] justify-center leading-[0] left-0 not-italic text-[26px] text-white top-[48px] translate-y-[-50%] w-[387.294px]">
        <p className="leading-[32px]">Are you at the idea stage? We will help you identify the critical MVP product scope.</p>
      </div>
      <Ul />
    </div>
  );
}

function Div24() {
  return (
    <div className="absolute h-[288px] left-[529.06px] top-0 w-[795.75px]" data-name="div">
      <div className="absolute h-[221.5px] left-0 top-[calc(50%-13.25px)] translate-y-[-50%] w-[317.875px]" data-name="help01.jpg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgHelp01Jpg} />
        </div>
      </div>
      <Div23 />
    </div>
  );
}

function Div25() {
  return (
    <div className="absolute h-[288px] left-0 right-0 top-[1037.05px]" data-name="div">
      <DivVPillsTab />
      <Div24 />
    </div>
  );
}

function Div26() {
  return (
    <div className="absolute h-[1325.05px] left-0 right-0 top-[4464.53px]" data-name="div">
      <div className="absolute h-[1009px] left-[-500px] top-[500px] w-[830px]" data-name="div">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[98.69%] left-0 max-w-none top-0 w-full" src={imgDiv1} />
        </div>
      </div>
      <Div22 />
      <div className="absolute flex flex-col font-['Inter:Medium',_sans-serif] font-medium h-[238px] justify-center leading-[118px] left-[67.19px] not-italic text-[114px] text-white top-[815.05px] translate-y-[-50%] w-[666.934px]">
        <p className="mb-0">{`How we can `}</p>
        <p>help grow</p>
      </div>
      <Div25 />
    </div>
  );
}

function AboutShape01Svg() {
  return (
    <div className="absolute h-[287px] left-0 top-0 w-[286px]" data-name="about-shape01.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 286 287">
        <g clipPath="url(#clip0_1_334)" id="about-shape01.svg">
          <path d={svgPaths.p16153780} id="Vector" stroke="var(--stroke-0, #353535)" strokeDasharray="4 4" />
        </g>
        <defs>
          <clipPath id="clip0_1_334">
            <rect fill="white" height="287" width="286" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Div27() {
  return (
    <div className="absolute h-[287px] right-[115.19px] top-[-172.8px] w-[286px]" data-name="div">
      <AboutShape01Svg />
    </div>
  );
}

function AboutShape02Svg() {
  return (
    <div className="absolute left-0 size-[287px] top-0" data-name="about-shape02.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 287 287">
        <g clipPath="url(#clip0_1_298)" id="about-shape02.svg">
          <path d={svgPaths.p3c9fbc80} id="Vector" stroke="var(--stroke-0, #353535)" />
        </g>
        <defs>
          <clipPath id="clip0_1_298">
            <rect fill="white" height="287" width="287" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Div28() {
  return (
    <div className="absolute right-[24px] size-[287px] top-[388.8px]" data-name="div">
      <AboutShape02Svg />
    </div>
  );
}

function ArrowRightSvg() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[39px]" data-name="arrow-right.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 40">
        <g id="arrow-right.svg">
          <path d="M38.3333 20H1.66663" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3dec4bc0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function I() {
  return (
    <div className="absolute h-[40px] left-[189.44px] top-[10px] w-[38px]" data-name="i">
      <ArrowRightSvg />
    </div>
  );
}

function A1() {
  return (
    <div className="h-[52px] relative shrink-0 w-[620px]" data-name="a">
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[26px] text-nowrap text-white top-[32.5px] translate-y-[-50%]">
        <p className="leading-[39px] whitespace-pre">More about us</p>
      </div>
      <I />
    </div>
  );
}

function Div29() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[20px] items-start left-[460.8px] pl-0 pr-[40px] py-0 top-[152px]" data-name="div">
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[26px] text-[rgba(255,255,255,0.6)] w-[618.872px]">
        <p className="leading-[36px]">Team of product and brand designers that are really passionate about blockchain technology and good design. We are not just UI freaks! We advocate users for better product experience and common sense.</p>
      </div>
      <A1 />
    </div>
  );
}

function Div30() {
  return (
    <div className="absolute h-[404px] left-0 right-0 top-[6135.17px]" data-name="div">
      <div className="absolute flex flex-col font-['Inter:Medium',_sans-serif] font-medium h-[120px] justify-center leading-[0] left-[460.8px] not-italic text-[115px] text-white top-[72px] translate-y-[-50%] w-[333.091px]">
        <p className="leading-[144px]">About</p>
      </div>
      <Div27 />
      <Div28 />
      <div className="absolute h-[344.766px] left-[115.19px] right-[1094.42px] top-[calc(50%-18.617px)] translate-y-[-50%]" data-name="about01.jpg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAbout01Jpg} />
        </div>
      </div>
      <div className="absolute h-[191.562px] left-[460.8px] right-[691.2px] top-[calc(50%+400.781px)] translate-y-[-50%]" data-name="about02.jpg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAbout02Jpg} />
        </div>
      </div>
      <div className="absolute h-[343.156px] left-[1094.42px] right-[115.19px] top-[calc(50%+204.578px)] translate-y-[-50%]" data-name="about03.jpg">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAbout03Jpg} />
        </div>
      </div>
      <Div29 />
    </div>
  );
}

function Div31() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8.594px] items-start leading-[0] not-italic pl-0 pr-[1.766px] py-0 relative shrink-0 text-nowrap" data-name="div">
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-[47px] text-white">
        <p className="leading-[57.6px] text-nowrap whitespace-pre">Web3 product studio</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[30px] relative shrink-0 text-[19px] text-[rgba(255,255,255,0.6)] whitespace-pre">
        <p className="mb-0">Feel free to reach out if you want to collaborate</p>
        <p>{` with us, or simply have a chat.`}</p>
      </div>
    </div>
  );
}

function ArrowRightSvg1() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[39px]" data-name="arrow-right.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 40">
        <g id="arrow-right.svg">
          <path d="M38.3333 20H1.66663" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3dec4bc0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function I1() {
  return (
    <div className="absolute h-[40px] left-[289.05px] top-[-9px] w-[38px]" data-name="i">
      <ArrowRightSvg1 />
    </div>
  );
}

function A2() {
  return (
    <div className="h-[26px] relative shrink-0 w-[327.047px]" data-name="a">
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[26px] text-nowrap text-white top-[13.5px] translate-y-[-50%]">
        <p className="leading-[39px] whitespace-pre">hello@thirdweb.studio</p>
      </div>
      <I1 />
    </div>
  );
}

function Div32() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[79px] items-start left-[24px] pb-[7px] pt-0 px-0 top-[143px]" data-name="div">
      <Div31 />
      <A2 />
    </div>
  );
}

function A3() {
  return (
    <div className="absolute box-border content-stretch flex items-start left-0 pl-0 pr-[4.547px] py-0 top-[62px]" data-name="a">
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[19px] text-[rgba(255,255,255,0.6)] text-nowrap">
        <p className="leading-[30px] whitespace-pre">WingRiders</p>
      </div>
    </div>
  );
}

function A4() {
  return (
    <div className="absolute box-border content-stretch flex items-start left-0 pl-0 pr-[0.688px] py-0 top-[96px]" data-name="a">
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[19px] text-[rgba(255,255,255,0.6)] text-nowrap">
        <p className="leading-[30px] whitespace-pre">Trackee</p>
      </div>
    </div>
  );
}

function A5() {
  return (
    <div className="absolute box-border content-stretch flex items-start left-0 pl-0 pr-[0.563px] py-0 top-[130px]" data-name="a">
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.6)] text-nowrap">
        <p className="leading-[30px] whitespace-pre">Worldcoin</p>
      </div>
    </div>
  );
}

function A6() {
  return (
    <div className="absolute box-border content-stretch flex items-start left-0 pl-0 pr-[2.375px] py-0 top-[164px]" data-name="a">
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[19px] text-[rgba(255,255,255,0.6)] text-nowrap">
        <p className="leading-[30px] whitespace-pre">Audience+</p>
      </div>
    </div>
  );
}

function Div33() {
  return (
    <div className="h-[237.594px] relative shrink-0 w-[117.328px]" data-name="div">
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[20px] text-nowrap text-white top-[15px] translate-y-[-50%]">
        <p className="leading-[30px] whitespace-pre">Our projects</p>
      </div>
      <A3 />
      <A4 />
      <A5 />
      <A6 />
    </div>
  );
}

function A7() {
  return (
    <div className="absolute box-border content-stretch flex items-start left-0 pl-0 pr-[2.109px] py-0 top-[62px]" data-name="a">
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[19px] text-[rgba(255,255,255,0.6)] text-nowrap">
        <p className="leading-[30px] whitespace-pre">Facebook</p>
      </div>
    </div>
  );
}

function A8() {
  return (
    <div className="absolute content-stretch flex items-start left-0 top-[96px]" data-name="a">
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.6)] text-nowrap">
        <p className="leading-[30px] whitespace-pre">Instagram</p>
      </div>
    </div>
  );
}

function A9() {
  return (
    <div className="absolute content-stretch flex items-start left-0 top-[130px]" data-name="a">
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.6)] text-nowrap">
        <p className="leading-[30px] whitespace-pre">Dribbble</p>
      </div>
    </div>
  );
}

function A10() {
  return (
    <div className="absolute content-stretch flex items-start left-0 top-[164px]" data-name="a">
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0.6)] text-nowrap">
        <p className="leading-[30px] whitespace-pre">Linkedin</p>
      </div>
    </div>
  );
}

function Div34() {
  return (
    <div className="h-[237.594px] relative shrink-0 w-[94.063px]" data-name="div">
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[19px] text-nowrap text-white top-[15px] translate-y-[-50%]">
        <p className="leading-[30px] whitespace-pre">Follow us</p>
      </div>
      <A7 />
      <A8 />
      <A9 />
      <A10 />
    </div>
  );
}

function Div35() {
  return (
    <div className="absolute box-border content-stretch flex gap-[115.188px] items-start left-[612.95px] pl-[115.188px] pr-0 py-0 top-[144px]" data-name="div">
      <Div33 />
      <Div34 />
    </div>
  );
}

function ArrowTopSvg() {
  return (
    <div className="absolute h-[39px] left-0 top-0 w-[40px]" data-name="arrow-top.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 39">
        <g id="arrow-top.svg">
          <path d="M20 0.666345V37.333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p23975700} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function I2() {
  return (
    <div className="h-[39px] relative shrink-0 w-[40px]" data-name="i">
      <ArrowTopSvg />
    </div>
  );
}

function A11() {
  return (
    <div className="absolute box-border content-stretch flex inset-[144px_24px_364.39px_1376px] items-start pb-[7px] pt-0 px-0" data-name="a">
      <I2 />
      <div className="absolute bottom-[-29.2px] flex items-center justify-center right-[136.47px] top-[55px] translate-x-[100%] w-[106.469px]">
        <div className="flex-none h-[106.469px] rotate-[90deg] w-[20.2px]">
          <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative size-full text-[13px] text-[rgba(255,255,255,0.3)]">
            <p className="leading-[30px]">Back to top</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterContact() {
  return (
    <div className="absolute h-[554.391px] left-0 overflow-clip right-0 top-[6999.97px]" data-name="footer#contact">
      <div className="absolute bg-[#3effb4] bottom-[-360px] left-[281px] rounded-[295px] size-[590px]" data-name="div" />
      <div className="absolute bg-[#53a0fd] bottom-[-10px] left-[741px] rounded-[195px] size-[390px]" data-name="div" />
      <div className="absolute bg-[#3023ae] bottom-[-360px] left-[713px] rounded-[295px] size-[590px]" data-name="div" />
      <Div32 />
      <Div35 />
      <A11 />
    </div>
  );
}

function LogoSvg() {
  return (
    <div className="h-[50px] relative shrink-0 w-[52px]" data-name="logo.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 50">
        <g id="logo.svg">
          <path d={svgPaths.pa529100} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="1.69968" />
          <path d={svgPaths.p333e3000} id="Vector_2" stroke="var(--stroke-0, white)" strokeWidth="1.69968" />
          <path d={svgPaths.p19575c00} id="Vector_3" stroke="var(--stroke-0, white)" strokeWidth="1.69968" />
        </g>
      </svg>
    </div>
  );
}

function LogoSvg1() {
  return (
    <div className="absolute content-stretch flex items-start left-[24px] top-1/2 translate-y-[-50%]" data-name="logo.svg">
      <LogoSvg />
    </div>
  );
}

function A12() {
  return (
    <div className="box-border content-stretch flex items-start pl-[24px] pr-[23.625px] py-[8px] relative shrink-0" data-name="a">
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-nowrap text-white">
        <p className="leading-[27px] whitespace-pre">Home</p>
      </div>
    </div>
  );
}

function A13() {
  return (
    <div className="box-border content-stretch flex items-start pl-[23px] pr-[24.375px] py-[8px] relative shrink-0" data-name="a">
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-nowrap text-white">
        <p className="leading-[27px] whitespace-pre">About</p>
      </div>
    </div>
  );
}

function A14() {
  return (
    <div className="box-border content-stretch flex items-start pl-[23px] pr-[24.641px] py-[8px] relative shrink-0" data-name="a">
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-nowrap text-white">
        <p className="leading-[27px] whitespace-pre">Contact</p>
      </div>
    </div>
  );
}

function Span() {
  return (
    <div className="absolute bg-gradient-to-r from-[#ffffff] right-0 rounded-[8.5px] size-[17px] to-[#c8b9f4] top-[5px]" data-name="span">
      <div className="absolute flex flex-col font-['Inter:Bold',_sans-serif] font-bold h-[10px] justify-center leading-[0] not-italic right-[8.41px] text-[10px] text-black text-center top-[9px] translate-x-[50%] translate-y-[-50%] w-[5.747px]">
        <p className="leading-[15px]">2</p>
      </div>
    </div>
  );
}

function A15() {
  return (
    <div className="box-border content-stretch flex items-start pl-[25px] pr-[24.766px] py-[8px] relative shrink-0" data-name="a">
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-center text-nowrap text-white">
        <p className="leading-[27px] whitespace-pre">Career</p>
      </div>
      <Span />
    </div>
  );
}

function Ul1() {
  return (
    <div className="absolute content-stretch flex items-start left-[calc(50%-6.438px)] top-[calc(50%+8.5px)] translate-x-[-50%] translate-y-[-50%]" data-name="ul">
      <A12 />
      <A13 />
      <A14 />
      <A15 />
    </div>
  );
}

function MenuSvg() {
  return (
    <div className="h-[13px] relative shrink-0 w-[21px]" data-name="menu.svg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 13">
        <g clipPath="url(#clip0_1_289)" id="menu.svg">
          <path d="M0.5 2.18557e-08L0.499999 13" id="Vector" stroke="var(--stroke-0, white)" />
          <path d="M10.5 2.18557e-08V13" id="Vector_2" stroke="var(--stroke-0, white)" />
          <path d="M20.5 2.18557e-08V13" id="Vector_3" stroke="var(--stroke-0, white)" />
        </g>
        <defs>
          <clipPath id="clip0_1_289">
            <rect fill="white" height="13" width="21" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MenuSvg1() {
  return (
    <div className="absolute content-stretch flex items-start left-[59.86px] top-[calc(50%+0.797px)] translate-y-[-50%]" data-name="menu.svg">
      <MenuSvg />
    </div>
  );
}

function A16() {
  return (
    <div className="absolute h-[43px] left-[1335.12px] top-1/2 translate-y-[-50%] w-[80.859px]" data-name="a">
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[18px] text-nowrap text-white top-1/2 translate-y-[-50%]">
        <p className="leading-[27px] whitespace-pre">Menu</p>
      </div>
      <MenuSvg1 />
    </div>
  );
}

function Div36() {
  return (
    <div className="absolute h-[60px] left-1/2 top-[calc(50%-3739.18px)] translate-x-[-50%] translate-y-[-50%] w-[1440px]" data-name="div">
      <LogoSvg1 />
      <Ul1 />
      <A16 />
    </div>
  );
}

export default function ThirdwebStudio() {
  return (
    <div className="bg-black relative size-full" data-name="thirdweb.studio">
      <Div5 />
      <DivLogos />
      <Div9 />
      <DivProjects />
      <Div21 />
      <Div26 />
      <Div30 />
      <FooterContact />
      <Div36 />
    </div>
  );
}