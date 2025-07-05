const { generateClient, ConsumerOperation, KiotaGenerationLanguage } = require('@microsoft/kiota');

(async () => {
  await generateClient({
    openAPIFilePath: 'api/api-spec.json',
    clientClassName: 'ApiClient',
    clientNamespaceName: 'ApiClient',
    language: KiotaGenerationLanguage.TypeScript,
    outputPath: 'frontend/api',
    operation: ConsumerOperation.Generate,
    workingDirectory: process.cwd(),
    cleanOutput: true,
  });
})();
