import React from "react";
import { FaMicrophone } from "react-icons/fa";
import Section from "../Section";
import MarkdownContent from "../MarkdownContent";
import { urlForSanityImage } from "../../network/api_service";
import { allIcons } from "../../CONSTANTS";
import blob3 from "../../assets/blob3.png";
import blob2 from "../../assets/blob2.png";

function IconByKey({ iconKey, className = "text-indigo-500 text-2xl" }) {
  if (!iconKey) return null;
  const Cmp = allIcons[iconKey];
  if (!Cmp) return null;
  return <Cmp className={className} />;
}

function maskStyleFor(kind) {
  if (kind === "blobContain") {
    return {
      WebkitMaskImage: `url(${blob3})`,
      maskImage: `url(${blob3})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskPosition: "center",
      maskPosition: "center",
    };
  }
  if (kind === "blobCover") {
    return {
      WebkitMaskImage: `url(${blob3})`,
      maskImage: `url(${blob3})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskSize: "cover",
      maskSize: "cover",
      WebkitMaskPosition: "center",
      maskPosition: "center",
    };
  }
  return {};
}

function alternatingBlobMask(kind) {
  const src = kind === "blob3" ? blob3 : blob2;
  return {
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "cover",
    maskSize: "cover",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };
}

const GRID_COLS = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

export default function ServicePageBlockRenderer({ blocks }) {
  if (!blocks?.length) return null;
  return (
    <>
      {blocks.map((block, i) => (
        <Block key={block._key || i} block={block} index={i} />
      ))}
    </>
  );
}

function Block({ block }) {
  const t = block?._type;
  switch (t) {
    case "service_page_block_intro_split":
      return <IntroSplit block={block} />;
    case "service_page_block_alternating_media":
      return <AlternatingMedia block={block} />;
    case "service_page_block_icon_card_grid":
      return <IconCardGrid block={block} />;
    case "service_page_block_icon_card_stack":
      return <IconCardStack block={block} />;
    case "service_page_block_split_disorders":
      return <SplitDisorders block={block} />;
    case "service_page_block_media_side_icon_list":
      return <MediaSideIconList block={block} />;
    case "service_page_block_goals_split":
      return <GoalsSplit block={block} />;
    case "service_page_block_two_column_plain":
      return <TwoColumnPlain block={block} />;
    default:
      return null;
  }
}

function IntroSplit({ block }) {
  const url = urlForSanityImage(block.image);
  const mask = block.maskStyle === "none" ? {} : maskStyleFor(block.maskStyle || "blobCover");
  const row =
    block.reverseOrder === true
      ? "flex-col lg:flex-row-reverse items-center gap-8"
      : "flex-col lg:flex-row items-center gap-8";

  return (
    <Section>
      <div className={`flex ${row}`}>
        {url ? (
          <div className="flex-shrink-0">
            <img
              src={url}
              alt={block.imageAlt || ""}
              className="w-[280px] md:w-[400px] lg:w-[480px] h-auto object-cover"
              style={mask}
            />
          </div>
        ) : null}
        <div className="max-w-xl text-center lg:text-left">
          {block.heading ? (
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{block.heading}</h1>
          ) : null}
          {block.body ? (
            <MarkdownContent className="text-gray-700 leading-relaxed text-base md:text-lg">
              {block.body}
            </MarkdownContent>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

function AlternatingMedia({ block }) {
  const url = urlForSanityImage(block.image);
  const reverse =
    block.reverseLayout === true ? "md:flex-row-reverse" : "";
  const sectionBg = block.sectionBg === "gray" ? "#f9fafb" : undefined;
  const mask =
    block.useBlobMask === false ? {} : alternatingBlobMask(block.blobMask || "blob2");
  const headingClass =
    block.headingStyle === "dark"
      ? "text-2xl md:text-3xl font-bold text-gray-800 mb-4"
      : "text-2xl md:text-3xl font-bold text-orange-600 mb-4";

  return (
    <Section color={sectionBg}>
      <div
        className={`max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 ${reverse}`}
      >
        {url ? (
          <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
            <img
              src={url}
              alt={block.imageAlt || ""}
              className="w-80 h-80 md:w-96 md:h-96 shadow-2xl object-cover"
              style={mask}
            />
          </div>
        ) : null}
        <div className="w-full md:w-1/2 text-center md:text-left">
          {block.heading ? <h2 className={headingClass}>{block.heading}</h2> : null}
          {block.body ? (
            <MarkdownContent className="text-gray-700 text-base md:text-lg leading-relaxed">
              {block.body}
            </MarkdownContent>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

function IconCardGrid({ block }) {
  const items = block.items || [];
  const sectionBg = block.sectionBg === "gray" ? "#f9fafb" : undefined;
  const cols = GRID_COLS[block.gridCols] || GRID_COLS[3];
  const cardBg = block.cardBg === "gray" ? "bg-[#f9fafb]" : "bg-white";

  return (
    <Section color={sectionBg}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          {block.sectionTitle ? (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{block.sectionTitle}</h2>
          ) : null}
          {block.sectionSubtitle ? (
            <MarkdownContent className="text-gray-600 mt-2 text-base sm:text-lg max-w-2xl mx-auto">
              {block.sectionSubtitle}
            </MarkdownContent>
          ) : null}
        </div>
        <div className={`grid ${cols} gap-8`}>
          {items.map((item, idx) => (
            <div
              key={item._key || idx}
              className={`${cardBg} p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300`}
            >
              <span className="flex gap-2 items-center">
                <div className="mb-4">
                  <IconByKey iconKey={item.iconKey} />
                </div>
                {item.title ? (
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                ) : null}
              </span>
              {item.description ? (
                <p className="text-gray-600 text-sm whitespace-pre-wrap">{item.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function IconCardStack({ block }) {
  const url = urlForSanityImage(block.sideImage);
  const items = block.items || [];
  const row =
    block.imageLeft === false
      ? "flex-col lg:flex-row-reverse items-center gap-12"
      : "flex-col lg:flex-row items-center gap-12";

  return (
    <Section>
      <div className={`max-w-7xl mx-auto flex ${row}`}>
        {url ? (
          <div className="flex-shrink-0 w-full lg:w-1/2">
            <img
              src={url}
              alt={block.sideImageAlt || ""}
              className="w-full h-auto rounded-xl shadow-md object-cover"
            />
          </div>
        ) : null}
        <div className="w-full lg:w-1/2">
          {block.columnTitle ? (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center lg:text-left">
              {block.columnTitle}
            </h2>
          ) : null}
          <div className="space-y-6">
            {items.map((item, idx) => (
              <div
                key={item._key || idx}
                className="bg-[#f1f5f9] p-6 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <span className="flex gap-2 items-center">
                  <div className="mb-4">
                    <IconByKey iconKey={item.iconKey} />
                  </div>
                  {item.title ? (
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                  ) : null}
                </span>
                {item.description ? (
                  <p className="text-gray-700 text-sm whitespace-pre-wrap">{item.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function SplitDisorders({ block }) {
  const url = urlForSanityImage(block.centerImage);
  const list = block.disorders || [];
  const mid = Math.ceil(list.length / 2);
  const left = list.slice(0, mid);
  const right = list.slice(mid);

  return (
    <Section color="#f9fafb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          {block.introTitle ? (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{block.introTitle}</h2>
          ) : null}
          {block.introBody ? (
            <MarkdownContent className="text-gray-700 text-base max-w-3xl mx-auto">
              {block.introBody}
            </MarkdownContent>
          ) : null}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="space-y-4">
            {left.map((name, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-4 text-gray-800 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <FaMicrophone className="text-indigo-500" />
                  <span>{name}</span>
                </div>
              </div>
            ))}
          </div>
          {url ? (
            <div className="w-full">
              <img
                src={url}
                alt={block.centerImageAlt || ""}
                className="w-full h-auto rounded-xl shadow-md object-cover"
              />
            </div>
          ) : null}
          <div className="space-y-4">
            {right.map((name, idx) => (
              <div
                key={idx + mid}
                className="bg-white border border-gray-200 rounded-lg p-4 text-gray-800 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <FaMicrophone className="text-indigo-500" />
                  <span>{name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function MediaSideIconList({ block }) {
  const url = urlForSanityImage(block.image);
  const items = block.items || [];
  const row =
    block.imageLeft === false
      ? "flex-col lg:flex-row-reverse items-center gap-12"
      : "flex-col lg:flex-row items-center gap-12";

  return (
    <Section>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          {block.sectionTitle ? (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{block.sectionTitle}</h2>
          ) : null}
          {block.sectionSubtitle ? (
            <MarkdownContent className="text-gray-600 text-base max-w-3xl mx-auto">
              {block.sectionSubtitle}
            </MarkdownContent>
          ) : null}
        </div>
        <div className={`flex ${row} gap-12`}>
          {url ? (
            <div className="w-full lg:w-1/2">
              <img
                src={url}
                alt={block.imageAlt || ""}
                className="w-full h-auto rounded-xl shadow-md object-cover"
              />
            </div>
          ) : null}
          <div className="w-full lg:w-1/2 space-y-6">
            {items.map((item, idx) => (
              <div
                key={item._key || idx}
                className="bg-[#f9fafb] p-5 rounded-lg shadow hover:shadow-md transition"
              >
                <div className="flex items-start gap-4">
                  <div>
                    <IconByKey iconKey={item.iconKey} />
                  </div>
                  <div>
                    {item.title ? (
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
                    ) : null}
                    {item.description ? (
                      <p className="text-gray-600 text-sm whitespace-pre-wrap">{item.description}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function GoalsSplit({ block }) {
  const url = urlForSanityImage(block.image);
  const goals = block.goals || [];
  const sectionBg = block.sectionBg === "gray" ? "#f9fafb" : undefined;
  const row =
    block.reverseLayout === true
      ? "flex-col lg:flex-row-reverse items-center gap-12"
      : "flex-col lg:flex-row items-center gap-12";

  return (
    <Section color={sectionBg}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          {block.sectionTitle ? (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{block.sectionTitle}</h2>
          ) : null}
          {block.sectionSubtitle ? (
            <MarkdownContent className="text-gray-600 text-base max-w-3xl mx-auto">
              {block.sectionSubtitle}
            </MarkdownContent>
          ) : null}
        </div>
        <div className={`flex ${row} gap-12`}>
          <div className="w-full lg:w-1/2 space-y-6">
            {goals.map((g, idx) => (
              <div
                key={g._key || idx}
                className="bg-white p-5 rounded-lg shadow hover:shadow-md transition"
              >
                <div className="flex items-start gap-4">
                  <div>
                    <IconByKey iconKey={g.iconKey} />
                  </div>
                  {g.text ? <p className="text-gray-700 text-sm whitespace-pre-wrap">{g.text}</p> : null}
                </div>
              </div>
            ))}
          </div>
          {url ? (
            <div className="w-full lg:w-1/2">
              <img
                src={url}
                alt={block.imageAlt || ""}
                className="w-full h-auto rounded-xl shadow-md object-cover"
              />
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

function TwoColumnPlain({ block }) {
  const url = urlForSanityImage(block.image);
  const sectionBg = block.sectionBg === "gray" ? "#f9fafb" : undefined;

  const textCol = (
    <div className="w-full lg:w-1/2">
      {block.heading ? (
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center lg:text-left">
          {block.heading}
        </h2>
      ) : null}
      {block.body ? (
        <MarkdownContent className="text-gray-700 leading-relaxed text-base md:text-lg">
          {block.body}
        </MarkdownContent>
      ) : null}
    </div>
  );

  const imgCol = url ? (
    <div className="flex-shrink-0 w-full lg:w-1/2">
      <img
        src={url}
        alt={block.imageAlt || ""}
        className="w-full h-auto rounded-xl shadow-md object-cover"
      />
    </div>
  ) : null;

  if (block.leadWithText === true) {
    return (
      <Section color={sectionBg}>
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
          {textCol}
          {imgCol}
        </div>
      </Section>
    );
  }

  const base =
    block.mobileImageBelow === true
      ? "flex-col-reverse lg:flex-row items-center gap-12"
      : block.reverseOrder === true
        ? "flex-col lg:flex-row-reverse items-center gap-12"
        : "flex-col lg:flex-row items-center gap-12";

  return (
    <Section color={sectionBg}>
      <div className={`max-w-7xl mx-auto flex ${base}`}>
        {imgCol}
        {textCol}
      </div>
    </Section>
  );
}
