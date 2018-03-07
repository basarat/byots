/**
 * Utils
 */
declare var process, require, __dirname;
var fs = require('fs');
export function readFile(filePath: string): string {
  return fs.readFileSync(__dirname + '/' + filePath, 'utf8');
}
export function writeFile(filePath: string, content: string) {
  fs.writeFileSync(__dirname + '/' + filePath, content);
}

/**
 * Fixes
 */
interface IFix {
  orig: string | RegExp;
  new: string;
}
interface IFixForFile {
  filePath: string,
  fixes: IFix[],
  additions?: string,
}
const fixesForFiles: IFixForFile[] = [
  {
    filePath: '../TypeScript/src/services/refactors/extractSymbol.ts',
    fixes: [
      {
        orig: 'const enum Usage',
        new: 'export const enum Usage'
      },
      {
        orig: 'type RangeToExtract',
        new: 'export type RangeToExtract'
      },
      {
        orig: 'interface TargetRange',
        new: 'export interface TargetRange'
      },
      {
        orig: 'enum RangeFacts',
        new: 'export enum RangeFacts'
      },
    ],
  },
  {
    filePath: '../TypeScript/src/services/formatting/rulesMap.ts',
    fixes: [
      {
        orig: 'enum RulesPosition',
        new: 'export enum RulesPosition'
      }
    ]
  },
  {
    filePath: '../TypeScript/src/services/codefixes/annotateWithTypeFromJSDoc.ts',
    fixes: [
      {
        orig: 'type DeclarationWithType',
        new: 'export type DeclarationWithType'
      },
  },
  {
    filePath: '../TypeScript/src/services/codefixes/importFixes.ts',
    fixes: [
      {
        orig: 'interface ImportCodeFixContext',
        new: 'export interface ImportCodeFixContext'
      },
      {
        orig: 'interface SymbolContext',
        new: 'export interface SymbolContext'
      },
      {
        orig: 'type ImportDeclarationMap',
        new: 'export type ImportDeclarationMap'
      },
      {
        orig: 'interface ExistingImportInfo',
        new: 'export interface ExistingImportInfo'
      },
      {
        orig: 'const enum ImportKind',
        new: 'export const enum ImportKind'
      },
    ]
  },
  {
    filePath:'../TypeScript/src/services/symbolDisplay.ts',
    fixes: [
      {
        orig: 'interface SymbolDisplayPartsDocumentationAndSymbolKind',
        new: 'export interface SymbolDisplayPartsDocumentationAndSymbolKind'
      },
    ]
  },
  {
    filePath:'../TypeScript/src/compiler/watchUtilities.ts',
    fixes: [
      {
        orig: 'interface FileAndDirectoryExistence',
        new: 'export interface FileAndDirectoryExistence'
      },
    ]
  },
  {
    filePath:'../TypeScript/src/compiler/parser.ts',
    fixes: [
      {
        orig: 'type PragmaDiagnosticReporter',
        new: 'export type PragmaDiagnosticReporter'
      },
    ]
  },
  {
    filePath:'../TypeScript/src/compiler/types.ts',
    fixes: [
      {
        orig: 'interface PragmaArgumentSpecification',
        new: 'export interface PragmaArgumentSpecification'
      },
      {
        orig: 'type ConcretePragmaSpecs',
        new: 'export type ConcretePragmaSpecs'
      },
      {
        orig: 'type PragmaArgumentType',
        new: 'export type PragmaArgumentType'
      },
      {
        orig: 'type PragmaArgTypeOptional',
        new: 'export type PragmaArgTypeOptional'
      },
      {
        orig: 'type PragmaArgTypeMaybeCapture',
        new: 'export type PragmaArgTypeMaybeCapture'
      },
    ]
  },
];

/**
 * Run the fixes
 */
fixesForFiles.forEach(fff => {
  let content = readFile(fff.filePath);
  content = content.split(/\r\n?|\n/).join('\n');
  fff.fixes.forEach(fix => {
    if (typeof fix.orig === 'string') {
      const orig = fix.orig.split(/\r\n?|\n/).join('\n').trim();
      if (content.indexOf(orig) === -1) {
        // OH OH . Fix no longer valid
        console.log('FIX ORIG NOT FOUND:', fff.filePath);
        console.log(fix)
        process.exit(1);
      }
      content = content.replace(orig, fix.new);
    }
    else {
      if (fix.orig.test(content) == null) {
        // OH OH . Fix no longer valid
        console.log('FIX ORIG NOT FOUND:', fff.filePath);
        console.log(fix)
        process.exit(1);
      }
      content = content.replace(fix.orig, fix.new);
    }
  })
  if (fff.additions) {
    content = content + fff.additions;
  }
  writeFile(fff.filePath, content);
})
