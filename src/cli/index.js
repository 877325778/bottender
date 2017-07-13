import program from 'commander';
import didYouMean from 'didyoumean';
import invariant from 'invariant';

import pkg from '../../package.json';

import { error, bold } from './shared/log';
import { toAbsolutePath } from './shared/path';
import deleteDomainWhitelist from './actions/deleteDomainWhitelist';
import deleteGetStartedButton from './actions/deleteGetStartedButton';
import deleteGreetingText from './actions/deleteGreetingText';
import deletePersistentMenu from './actions/deletePersistentMenu';
import getDomainWhitelist from './actions/getDomainWhitelist';
import getGetStartedButton from './actions/getGetStartedButton';
import getGreetingText from './actions/getGreetingText';
import getPersistentMenu from './actions/getPersistentMenu';
import setDomainWhitelist from './actions/setDomainWhitelist';
import setGetStartedButton from './actions/setGetStartedButton';
import setGreetingText from './actions/setGreetingText';
import setMessengerProfile from './actions/setMessengerProfile';
import setPersistentMenu from './actions/setPersistentMenu';
import setWebhook from './actions/setWebhook';
import uploadImages from './actions/uploadImages';

program.version(pkg.version);

program
  .command('domain-whitelist:get')
  .alias('dwg')
  .description('get domain whitelist')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bot.json`'
  )
  .action(({ config }) => {
    getDomainWhitelist(config);
  });

program
  .command('domain-whitelist:set')
  .alias('dws')
  .description('set domains whitelist')
  .option(
    '-d, --domains <array of domain_name>',
    'All domains to set domains whitelist, should separate by comma(,)'
  )
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bot.json`'
  )
  .action(({ config, domains }) => {
    invariant(domains, '-d <array of domain_name> is required but not found.');
    setDomainWhitelist(domains.split(','), config);
  });

program
  .command('domain-whitelist:delete')
  .alias('dwd')
  .description('delete domain whitelist')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bot.json`'
  )
  .action(({ config }) => {
    deleteDomainWhitelist(config);
  });

program
  .command('persistent-menu:get')
  .alias('pmg')
  .description('get persistent menu')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bot.json`'
  )
  .action(({ config }) => {
    getPersistentMenu(config);
  });

program
  .command('persistent-menu:set')
  .alias('pms')
  .description('set persistent menu')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bot.json`'
  )
  .action(({ config }) => {
    setPersistentMenu(config);
  });

program
  .command('persistent-menu:delete')
  .alias('pmd')
  .description('delete persistent menu')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bot.json`'
  )
  .action(({ config }) => {
    deletePersistentMenu(config);
  });

program
  .command('get-started:get')
  .alias('gsg')
  .description('get get started button')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bot.json`'
  )
  .action(({ config }) => {
    getGetStartedButton(config);
  });

program
  .command('get-started:set')
  .alias('gss')
  .description('set get started button')
  .option(
    '-p, --payload <payload>',
    'The payload to set for get started button'
  )
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bot.json`'
  )
  .action(({ payload, config }) => {
    setGetStartedButton(payload, config);
  });

program
  .command('get-started:delete')
  .alias('gsd')
  .description('delete get started button')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bot.json`'
  )
  .action(({ config }) => {
    deleteGetStartedButton(config);
  });

program
  .command('greeting-text:get')
  .alias('gtg')
  .description('get greeting text')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bot.json`'
  )
  .action(({ config }) => {
    getGreetingText(config);
  });

program
  .command('greeting-text:set')
  .alias('gts')
  .description('set greeting text for specific project')
  .option('-g, --greetingText <greeting_text>', 'The greeting text of the bot')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bot.json`'
  )
  .action(({ config, greetingText }) => {
    invariant(greetingText, '-g <greeting_text> is required but not found.');
    setGreetingText(greetingText, config);
  });

program
  .command('greeting-text:delete')
  .alias('gtd')
  .description('delete greeting text')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bot.json`'
  )
  .action(({ config }) => {
    deleteGreetingText(config);
  });

program
  .command('messenger-profile:set')
  .alias('mps')
  .description('set messenger profile from config file')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bot.json`'
  )
  .action(({ config }) => {
    setMessengerProfile(config);
  });

program
  .command('set-webhook')
  .alias('swh')
  .description('set messenger webhook url')
  .option('-w, --webhook <webhook_url>', 'The callback url for webhook.')
  .option(
    '-c, --config <config_file_path>',
    'The config file path of your project. Default to `bot.json`'
  )
  .option(
    '-v, --verifyToken <verify_token>',
    'The verify token for webhook usage.'
  )
  .action(({ webhook, config, verifyToken }) => {
    setWebhook(webhook, config, verifyToken);
  });

program
  .command('upload-images <folder>')
  .alias('img')
  .description('upload all images in the folder')
  .option(
    '-o, --output <output_path>',
    'The out path of the upload result json file.'
  )
  .option('-c, --container <container_name>', 'The URL prefix of the file')
  .action((folderPath, { output, container }) => {
    uploadImages({
      folderPath: toAbsolutePath(folderPath),
      outputPath: output,
      container,
    });
  });

program.command('*').action(command => {
  error(`unknown command: ${bold(command)}`);
  const commandNames = program.commands
    .map(c => c._name)
    .filter(name => name !== '*');

  const closeMatch = didYouMean(command, commandNames);
  if (closeMatch) {
    error(`did you mean ${bold(closeMatch)}?`);
  }
  process.exit(1);
});

program.parse(process.argv);
