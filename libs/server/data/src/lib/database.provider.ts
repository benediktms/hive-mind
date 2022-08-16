import { DataSource } from 'typeorm';

// type EntitiesAndMigrationsOpts = Pick<
//   DataSourceOptions,
//   'entities' | 'migrations'
// >;

// const importAllFunctions = (
//   requireContext: __WebpackModuleApi.RequireContext
// ) => {
//   return requireContext
//     .keys()
//     .sort()
//     .flatMap((filename) => {
//       const required = requireContext(filename);
//       return Object.keys(required).reduce((result, exportedKey) => {
//         const exported = required[exportedKey];
//         if (typeof exported === 'function') {
//           return result.concat(exported);
//         }
//         return result;
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       }, [] as any);
//     });
// };

// const entitiesViaWebpack: NonNullable<EntitiesAndMigrationsOpts['entities']> =
//   importAllFunctions(require.context('../entities', true, /\.entity\.ts$/));

// const migrationsViaWebpack: NonNullable<
//   EntitiesAndMigrationsOpts['migrations']
// > = importAllFunctions(require.context('../migrations', true, /\.ts$/));

// const entities = [
//   `${join(process.cwd(), 'apps', 'api')}/**/*.entity{.ts,.js}`,
//   `${join(process.cwd(), 'libs', 'server')}/**/*.entity{.ts,.js}`,
// ];

// const migrations = [
//   `${join(process.cwd(), 'apps', 'api')}/**/migrations/*.{.ts,.js}`,
//   `${join(process.cwd(), 'libs', 'server')}/**/migrations/*.{.ts,.js}`,
// ];

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        // entities: getMetadataArgsStorage().tables.map((t) => t.target),
        entities: ['../entities'],
        // migrations: migrationsViaWebpack,
        migrations: ['../migrations'],
      });

      return dataSource.initialize();
    },
  },
];
