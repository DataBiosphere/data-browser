import { parseContentRows, readFile } from "../../app/utils/tsvParser";

interface DiseaseCode {
  ["Disease abbrev"]: string;
  ["Disease name"]: string;
}

interface DiseaseCodeTree {
  children?: Record<string, DiseaseCodeTree | undefined>;
  value?: string;
}

type ConsentSymbol =
  | PrimaryConsentSymbol
  | SecondaryConsentSymbol
  | ParameterConsentSymbol;

type HeadConsentSymbol = PrimaryConsentSymbol | SecondaryConsentSymbol;

type PrimaryConsentSymbol =
  | PrimaryConsentSymbolNoParam
  | PrimaryConsentSymbolWithParam;

interface PrimaryConsentSymbolNoParam {
  class: "primary";
  long: string;
  name: string;
  param: "none";
  short: string;
}

interface PrimaryConsentSymbolWithParam {
  class: "primary";
  longWithParam: string;
  name: string;
  param: "required";
  short: string;
}

interface SecondaryConsentSymbol {
  class: "secondary";
  long: string;
  name: string;
  param: "none";
}

interface ParameterConsentSymbol {
  class: "parameter";
  name: string;
}

type ConsentSymbolGroup =
  | PrimaryConsentSymbolGroup
  | SecondaryConsentSymbolGroup;

interface PrimaryConsentSymbolGroup {
  class: "primary";
  head: PrimaryConsentSymbol;
  parameter: ConsentSymbol[];
  parameterSpecialText?: string;
  separators: string[];
}

interface SecondaryConsentSymbolGroup {
  class: "secondary";
  head: SecondaryConsentSymbol;
  parameter: ConsentSymbol[];
  parameterSpecialText?: string;
  separators: string[];
}

interface ParsedConsentCode {
  primary: PrimaryConsentSymbolGroup | null;
  secondary: SecondaryConsentSymbolGroup[];
}

type BoolFieldSymbolName = (typeof boolFieldConsentSymbols)[number];

interface ConsentDescriptions {
  boolFieldSymbols: Partial<Record<BoolFieldSymbolName, boolean>>;
  consentLongName: string;
  consentTitle: string;
  diseaseText: string;
  DS: string;
}

const SOURCE_FIELD_KEY = {
  DISEASE_ABBREV: "Disease abbrev",
  DISEASE_NAME: "Disease name",
};

const SOURCE_FIELD_TYPE = {
  DISEASE_ABBREV: "string",
  DISEASE_NAME: "string",
};

const tsvPath = "common/disease_abbrev_mapping.tsv";

const consentSymbolDefsList: ConsentSymbol[] = [
  {
    class: "primary",
    long: "No restrictions on data use.",
    name: "NRES",
    param: "none",
    short: "No restrictions",
  },
  {
    class: "primary",
    long: "Use of the data is limited only by the terms of the Data Use Certification.",
    name: "GRU",
    param: "none",
    short: "General research use and clinical care",
  },
  {
    class: "primary",
    long: "Use of the data is limited to health/medical/biomedical purposes; does not include the study of population origins or ancestry.",
    name: "HMB",
    param: "none",
    short: "Health/medical/biomedical research and clinical care",
  },
  {
    class: "primary",
    longWithParam: "Use of the data must be related to [].",
    name: "DS",
    param: "required",
    short: "Disease-specific research and clinical care",
  },
  {
    class: "secondary",
    long: "Use of the data is limited to genetic studies only.",
    name: "GSO",
    param: "none",
  },
  {
    class: "secondary",
    long: "Use of the data is limited to not-for-profit organizations.",
    name: "NPU",
    param: "none",
  },
  {
    class: "secondary",
    long: "Requestor agrees to make results of studies using the data available to the larger scientific community.",
    name: "PUB",
    param: "none",
  },
  {
    class: "secondary",
    long: "Requestor must provide a letter of collaboration with the primary study investigator(s).",
    name: "COL",
    param: "none",
  },
  {
    class: "secondary",
    long: "Requesting institution's IRB or equivalent body must approve the requested use.",
    name: "IRB",
    param: "none",
  },
  {
    class: "secondary",
    long: "The dataset can be used for methods research and development (e.g., development of statistical software or algorithms).",
    name: "MDS",
    param: "none",
  },
];

// Convert symbol definitions to object indexed by symbol name
const consentSymbolDefs = Object.fromEntries(
  consentSymbolDefsList.map((def) => [def.name, def])
);

// Symbols that have output fields for whether they appear or not
export const boolFieldConsentSymbols = [
  "NRES",
  "GRU",
  "HMB",
  "IRB",
  "PUB",
  "COL",
  "NPU",
  "MDS",
  "GSO",
] as const;

// Initialize tree so that disease abbreviations can be identified piece-by-piece and distinguished from other consent code symbols
const diseaseCodeTreePromise = makeDiseaseCodeTree();

async function makeDiseaseCodeTree(): Promise<DiseaseCodeTree> {
  // Each branch in the tree is indexed by an abbreviation piece (pieces being e.g. "ADHD" and "RC" in "ADHD-RC")
  // Each node has a "value" entry and/or a "children" entry
  // The value stores the full name of the disease that's identified by the node's path in the tree
  // The children represent all disease abbreviations that have the node's path as a prefix

  const file = await readFile(tsvPath);
  if (!file) {
    throw new Error(`File ${tsvPath} not found`);
  }

  const diseaseCodes = (await parseContentRows(
    file,
    "\t",
    SOURCE_FIELD_KEY,
    SOURCE_FIELD_TYPE
  )) as DiseaseCode[];

  const tree: DiseaseCodeTree = {};
  let node: DiseaseCodeTree;

  for (const {
    ["Disease abbrev"]: abbrev,
    ["Disease name"]: name,
  } of diseaseCodes) {
    node = tree;
    for (const piece of abbrev.split("-")) {
      if (!node.children) node.children = {};
      node = node.children[piece] || (node.children[piece] = {});
    }
    node.value = name;
  }

  return tree;
}

export async function generateConsentDescriptions(
  code: string
): Promise<ConsentDescriptions> {
  if (code === "" || code === "TBD" || code === "NA" || code == "Unspecified") {
    return {
      DS: "Unspecified",
      boolFieldSymbols: {},
      consentLongName: "Unspecified",
      consentTitle: "Unspecified",
      diseaseText: "Unspecified",
    };
  }

  // Convert consent code to an array of objects representing symbols, and an array of the separators between the symbols
  // Known symbols are taken from consentSymbolDefs, and unknown symbols are classed as "parameter"
  const separators: string[] = [];
  const symbols: ConsentSymbol[] = [];
  for (const [, sep, symbol] of code.matchAll(/(^|-|_|,\s*)([^-_,]*)/g)) {
    separators.push(sep);
    symbols.push(
      consentSymbolDefs[symbol] || { class: "parameter", name: symbol }
    );
  }

  const [symbolGroups, error] = parseConsentSymbols(
    symbols,
    separators,
    await diseaseCodeTreePromise
  );

  return symbolGroupsToDescriptions(symbolGroups, error);
}

function parseConsentSymbols(
  symbols: ConsentSymbol[],
  separators: string[],
  diseaseCodeTree: DiseaseCodeTree
): [ParsedConsentCode, string] {
  let error = "";
  let i = 0;
  let currentClass: HeadConsentSymbol["class"] = "primary";
  let primaryGroup: PrimaryConsentSymbolGroup | null = null;
  const secondaryGroups: SecondaryConsentSymbolGroup[] = [];

  // Loop over the consent code's symbols
  // The entire consent code will be processed even if there's unrecognized syntax, in order to find values for the symbol-specific fields
  while (i < symbols.length) {
    const symbol = symbols[i];

    // Check that the current symbol has the expected class
    if (symbol.class !== currentClass) {
      error = error || getClassError(symbols[i]);
      i += 1;
      continue;
    }

    const [j, group, groupError] = parseConsentSymbolGroup(
      symbol,
      symbols,
      separators,
      i,
      diseaseCodeTree
    );

    if (group.class === "primary") primaryGroup = group;
    else secondaryGroups.push(group);

    error = error || groupError;

    i = j;

    currentClass = "secondary";
  }

  const groups: ParsedConsentCode = {
    primary: primaryGroup,
    secondary: secondaryGroups,
  };

  return [groups, error];
}

function getClassError(symbol: ConsentSymbol): string {
  if (symbol.class === "parameter")
    return "".concat('Unknown symbol "', symbol.name, '"');
  else
    return "".concat(
      "Invalid position for ",
      symbol.class,
      ' symbol "',
      symbol.name,
      '"'
    );
}

function parseConsentSymbolGroup(
  head: HeadConsentSymbol,
  symbols: ConsentSymbol[],
  separators: string[],
  i: number,
  diseaseCodeTree: DiseaseCodeTree
): [number, ConsentSymbolGroup, string] {
  const group: ConsentSymbolGroup =
    head.class === "primary"
      ? {
          class: "primary",
          head,
          parameter: [],
          separators: [],
        }
      : {
          class: "secondary",
          head,
          parameter: [],
          separators: [],
        };

  let error = "";

  if (head.param !== "none") {
    // Parse parameter
    const j = i;
    // If the symbol is "DS", use the disease code tree
    let treeNode = symbols[j].name == "DS" ? diseaseCodeTree : null;
    // Parse symbols as part of the parameter as long as they're in the tree or have class "parameter"
    while (
      i + 1 < symbols.length &&
      (symbols[i + 1].class == "parameter" ||
        (treeNode?.children &&
          Object.prototype.hasOwnProperty.call(
            treeNode.children,
            symbols[i + 1].name
          )))
    ) {
      i += 1;
      group.parameter.push(symbols[i]);
      group.separators.push(separators[i]);
      treeNode = treeNode?.children?.[symbols[i].name] || null;
    }
    if (i == j && !error) {
      // If i hasn't changed, there's a missing parameter
      error = "".concat(
        'Missing required parameter to "',
        symbols[i].name,
        '"'
      );
    }
    if (treeNode?.value) group.parameterSpecialText = treeNode.value;
  }

  i += 1;

  return [i, group, error];
}

function symbolGroupsToDescriptions(
  symbolGroups: ParsedConsentCode,
  error: string
): ConsentDescriptions {
  const boolFieldSymbols = Object.fromEntries(
    boolFieldConsentSymbols.map((s) => [s, false])
  );
  let DS = "";
  let diseaseText = "";

  const groupsArray = [
    ...(symbolGroups.primary ? [symbolGroups.primary] : []),
    ...symbolGroups.secondary,
  ];

  for (const group of groupsArray) {
    const symbolName = group.head.name;
    if (isBoolFieldSymbolName(symbolName)) {
      // Update boolean output field
      boolFieldSymbols[symbolName] = true;
    }
    if (symbolName === "DS") {
      DS = getParamText(group);
      diseaseText = group.parameterSpecialText || "";
    }
  }

  const consentNames =
    error || !symbolGroups.primary
      ? {
          consentLongName: "ERROR: ".concat(error),
          consentTitle: "ERROR",
        }
      : getConsentCodeNames(symbolGroups.primary, symbolGroups.secondary);

  return {
    DS,
    boolFieldSymbols,
    diseaseText,
    ...consentNames,
  };
}

function getConsentCodeNames(
  primaryGroup: PrimaryConsentSymbolGroup,
  secondaryGroups: SecondaryConsentSymbolGroup[]
): Pick<ConsentDescriptions, "consentLongName" | "consentTitle"> {
  let short = secondaryGroups
    .map((group) =>
      group.parameter.length
        ? group.head.name.concat(group.separators[0], getParamText(group))
        : group.head.name
    )
    .join(", ");

  if (primaryGroup.parameter.length)
    short = getParamText(primaryGroup).concat(short && ", ", short);

  short = short
    ? primaryGroup.head.short.concat(" (", short, ")")
    : primaryGroup.head.short;

  let long = getGroupLongText(primaryGroup);

  if (secondaryGroups.length)
    long = long.concat(" ", secondaryGroups.map(getGroupLongText).join(" "));

  return {
    consentLongName: long,
    consentTitle: short,
  };
}

function getGroupLongText(group: ConsentSymbolGroup): string {
  if (group.head.param === "none") return group.head.long;
  else {
    let paramText = group.parameterSpecialText;
    if (!paramText) {
      paramText = getParamText(group);
      if (group.head.name === "DS")
        paramText = "".concat('disease "', paramText, '"');
    }
    return group.head.longWithParam.replace("[]", paramText);
  }
}

function getParamText(symbolGroup: ConsentSymbolGroup): string {
  return symbolGroup.parameter
    .map((s, i) => (i ? symbolGroup.separators[i] : "") + s.name)
    .join("");
}

function isBoolFieldSymbolName(symbol: string): symbol is BoolFieldSymbolName {
  return (boolFieldConsentSymbols as ReadonlyArray<string>).includes(symbol);
}
