import React from "react";

interface LLMResponseProps {
  content: string;
  className?: string;
}

export const LLMResponse: React.FC<LLMResponseProps> = ({
  content,
  className = "",
}) => {
  // Helper function to process the content into sections
  const processSections = (text: string) => {
    return text.split("\n\n").filter((section) => section.trim());
  };

  // Helper function to process list items
  const processListItems = (text: string) => {
    return text
      .split("\n")
      .filter((line) => line.trim().startsWith("* "))
      .map((line) => line.replace("* ", ""));
  };

  // Helper function to check if section is a list
  const isList = (section: string) => {
    return section
      .trim()
      .split("\n")
      .some((line) => line.trim().startsWith("* "));
  };

  // Helper function to process HTML-like tags
  const processContent = (text: string) => {
    // Process bold tags
    text = text.replace(/<b>(.*?)<\/b>/g, '<span class="font-bold">$1</span>');

    // Process italic tags
    text = text.replace(/<i>(.*?)<\/i>/g, '<span class="italic">$1</span>');

    // Process underline tags
    text = text.replace(/<u>(.*?)<\/u>/g, '<span class="underline">$1</span>');

    // Process code tags
    text = text.replace(
      /<code>(.*?)<\/code>/g,
      '<code class="bg-gray-100 rounded px-1 font-mono">$1</code>',
    );

    return text;
  };

  // Helper function to check if section is a heading
  const isHeading = (section: string) => {
    return (
      section.includes("<b>") && !section.includes(":") && section.length < 100
    );
  };

  const sections = processSections(content);

  return (
    <div className={`space-y-4 ${className}`}>
      {sections.map((section, index) => {
        if (isList(section)) {
          const items = processListItems(section);
          return (
            <ul key={index} className="list-inside list-disc space-y-2">
              {items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="text-gray-800"
                  dangerouslySetInnerHTML={{
                    __html: processContent(item),
                  }}
                />
              ))}
            </ul>
          );
        } else if (isHeading(section)) {
          return (
            <h3
              key={index}
              className="mb-2 text-xl font-semibold text-gray-900"
              dangerouslySetInnerHTML={{
                __html: processContent(section),
              }}
            />
          );
        } else {
          return (
            <p
              key={index}
              className="leading-relaxed text-gray-800"
              dangerouslySetInnerHTML={{
                __html: processContent(section),
              }}
            />
          );
        }
      })}
    </div>
  );
};
