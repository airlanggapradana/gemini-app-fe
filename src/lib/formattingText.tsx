import React from "react";

interface HeadingStyles {
  h1?: string;
  h2?: string;
  h3?: string;
  h4?: string;
  h5?: string;
  h6?: string;
}

interface FormattingOptions {
  enableHighlighting?: boolean;
  enableCodeBlocks?: boolean;
  enableBlockquotes?: boolean;
  enableLinks?: boolean;
  enableCustomColors?: boolean;
  roundedCorners?: boolean;
  listStyle?: "disc" | "decimal" | "none" | "circle" | "square";
  headingStyles?: HeadingStyles;
}

interface LLMResponseProps {
  content: string;
  className?: string;
  options?: FormattingOptions;
  theme?: "light" | "dark";
}

const defaultHeadingStyles: HeadingStyles = {
  h1: "text-4xl font-bold mb-6",
  h2: "text-3xl font-semibold mb-5",
  h3: "text-2xl font-semibold mb-4",
  h4: "text-xl font-medium mb-3",
  h5: "text-lg font-medium mb-2",
  h6: "text-base font-medium mb-2",
};

export const LLMResponse: React.FC<LLMResponseProps> = ({
  content,
  className = "",
  options = {},
  theme = "light",
}) => {
  const {
    enableHighlighting = true,
    enableCodeBlocks = true,
    enableBlockquotes = true,
    enableLinks = true,
    enableCustomColors = true,
    roundedCorners = true,
    listStyle = "disc",
    headingStyles = defaultHeadingStyles,
  } = options;

  // Theme colors
  const themeColors = {
    light: {
      text: "text-gray-800",
      bg: "bg-white",
      border: "border-gray-200",
      code: "bg-gray-100",
      blockquote: "bg-gray-50",
      highlight: "bg-yellow-100",
      headings: {
        primary: "text-gray-900",
        secondary: "text-gray-800",
      },
    },
    dark: {
      text: "text-gray-200",
      bg: "bg-gray-800",
      border: "border-gray-700",
      code: "bg-gray-900",
      blockquote: "bg-gray-700",
      highlight: "bg-yellow-900",
      headings: {
        primary: "text-white",
        secondary: "text-gray-100",
      },
    },
  }[theme];

  // Helper function to process the content into sections
  const processSections = (text: string) => {
    return text.split("\n\n").filter((section) => section.trim());
  };

  // Enhanced heading detection and processing
  const processHeading = (
    section: string,
  ): { level: number; content: string } | null => {
    // Check for HTML-style headings
    const htmlHeadingMatch = section.match(/<h([1-6])>(.*?)<\/h\1>/);
    if (htmlHeadingMatch) {
      return {
        level: htmlHeadingMatch[1] ? parseInt(htmlHeadingMatch[1]) : 0,
        content: htmlHeadingMatch[2] || "",
      };
    }

    // Check for Markdown-style headings
    const markdownHeadingMatch = section.match(/^(#{1,6})\s+(.+)$/);
    if (markdownHeadingMatch) {
      return {
        level: markdownHeadingMatch[1]?.length || 0,
        content: markdownHeadingMatch[2] || "",
      };
    }

    // Check for bold text that looks like a heading
    if (
      section.includes("<b>") &&
      !section.includes(":") &&
      section.length < 100
    ) {
      const boldContent = section.replace(/<\/?b>/g, "").trim();
      return {
        level: 2, // Default to h2 for bold headings
        content: boldContent,
      };
    }

    return null;
  };

  // Content processing functions remain the same as before
  const processContent = (text: string) => {
    let processedText = text;

    // Basic formatting
    processedText = processedText.replace(
      /<b>(.*?)<\/b>/g,
      '<span class="font-bold">$1</span>',
    );
    processedText = processedText.replace(
      /<i>(.*?)<\/i>/g,
      '<span class="italic">$1</span>',
    );
    processedText = processedText.replace(
      /<u>(.*?)<\/u>/g,
      '<span class="underline">$1</span>',
    );

    if (enableCustomColors) {
      processedText = processedText.replace(
        /<color:([^>]+)>(.*?)<\/color>/g,
        '<span class="text-$1">$2</span>',
      );
    }

    if (enableCodeBlocks) {
      processedText = processedText.replace(
        /`([^`]+)`/g,
        `<code class="${themeColors.code} px-1 rounded font-mono text-sm">$1</code>`,
      );
    }

    if (enableHighlighting) {
      processedText = processedText.replace(
        /<mark>(.*?)<\/mark>/g,
        `<mark class="${themeColors.highlight} px-1 rounded">$1</mark>`,
      );
    }

    if (enableLinks) {
      processedText = processedText.replace(
        /<a href="([^"]+)">(.*?)<\/a>/g,
        '<a href="$1" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$2</a>',
      );
    }

    return processedText;
  };

  // Render heading with proper styling
  const renderHeading = (level: number, content: string, index: number) => {
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
    const headingClass =
      headingStyles[`h${level}` as keyof HeadingStyles] ||
      defaultHeadingStyles[`h${level}` as keyof HeadingStyles];

    return React.createElement(HeadingTag, {
      key: index,
      className: `${headingClass} ${themeColors.headings.primary} ${roundedCorners ? "rounded-lg" : ""}`,
      dangerouslySetInnerHTML: {
        __html: processContent(content),
      },
    });
  };

  const sections = processSections(content);

  return (
    <div
      className={`space-y-4 ${themeColors.text} ${themeColors.bg} ${className}`}
    >
      {sections.map((section, index) => {
        const headingInfo = processHeading(section);

        if (headingInfo) {
          return renderHeading(headingInfo.level, headingInfo.content, index);
        }

        // Rest of the section processing remains the same
        return (
          <p
            key={index}
            className={`leading-relaxed ${roundedCorners ? "rounded-lg" : ""}`}
            dangerouslySetInnerHTML={{
              __html: processContent(section),
            }}
          />
        );
      })}
    </div>
  );
};
