# Stack Example

## 📦 Запуск проекта

### NPM

```bash
# Установка зависимостей
npm install

# Режим разработки
npm run dev

# Сборка для production
npm run build
```

### Docker

```bash
# Сборка образа
docker build -t stack-example .

# Запуск (статика внутри образа)
docker run -d -p 8080:80 --name stack-example-app stack-example

# Запуск с volumes (используя локальную сборку dist/)
npm run build
docker run -d -p 8080:80 \
  -v $(pwd)/dist:/usr/share/nginx/html:ro \
  --name stack-example-app \
  stack-example
```

## 📁 Структура проекта

```
stack-example/
├── src/
│   ├── shared/                    # Переиспользуемые ресурсы
│   │   ├── ui/                    # UI компоненты
│   │   │   ├── button/            # Компонент кнопки
│   │   │   ├── checkbox/          # Компонент чекбокса
│   │   │   ├── input/             # Компонент инпута
│   │   │   ├── modal/             # Модальное окно
│   │   │   ├── pagination/        # Пагинация
│   │   │   ├── select/            # Компонент выбора
│   │   │   ├── spinner/           # Индикатор загрузки
│   │   │   ├── table/             # Таблица
│   │   │   └── index.ts           # Экспорты UI компонентов
│   │   └── lib/                   # Утилиты и хелперы
│   │       ├── export-to-csv.ts   # Экспорт данных в CSV
│   │       ├── format-date.ts     # Форматирование дат
│   │       ├── get-default-avatar.ts # Получение аватара
│   │       ├── validate-email.ts  # Валидация email
│   │       └── index.ts           # Экспорты утилит
│   │
│   ├── entities/                  # Бизнес-сущности
│   │   └── user/                  # Сущность пользователя
│   │       ├── api/               # API запросы
│   │       │   └── user-api.ts    # Методы API для пользователей
│   │       │
│   │       ├── types/             # TypeScript типы и интерфейсы
│   │       │   └── index.ts       # IUser, TUserRole, TUserStatus, DTOs
│   │       │
│   │       ├── model/             # Бизнес-логика и модели
│   │       │   ├── user.ts        # Класс User с методами
│   │       │   ├── user-manager.ts   # Менеджер коллекции пользователей
│   │       │   ├── user-helpers.ts   # Вспомогательные функции
│   │       │   ├── user-columns.ts   # Конфигурация колонок таблицы
│   │       │   └── index.ts          # Экспорты моделей
│   │       │
│   │       ├── composables/       # Vue композаблы
│   │       │   ├── use-table.ts   # Логика таблицы и фильтрации
│   │       │   ├── use-actions.ts # Действия (CRUD операции)
│   │       │   └── index.ts       # Экспорты композаблов
│   │       │
│   │       ├── ui/                # UI компоненты сущности
│   │       │   ├── modal/         # Модальные окна
│   │       │   │   ├── AddUserForm.vue        # Форма добавления
│   │       │   │   ├── UserDetailsContent.vue # Детальная информация
│   │       │   │   └── index.ts               # Экспорты модалок
│   │       │   │
│   │       │   ├── table/         # Компоненты таблицы
│   │       │   │   ├── cell/      # Ячейки таблицы
│   │       │   │   │   ├── NameCell.vue     # Ячейка имени
│   │       │   │   │   ├── EmailCell.vue    # Ячейка email
│   │       │   │   │   ├── RoleCell.vue     # Ячейка роли
│   │       │   │   │   ├── StatusCell.vue   # Ячейка статуса
│   │       │   │   │   ├── ActionsCell.vue  # Ячейка действий
│   │       │   │   │   ├── types.ts         # Типы для ячеек
│   │       │   │   │   └── index.ts         # Экспорты ячеек
│   │       │   │   │
│   │       │   │   ├── UserTableHeader.vue   # Хедер таблицы
│   │       │   │   ├── UserTableFilters.vue  # Фильтры таблицы
│   │       │   │   └── index.ts              # Экспорты компонентов
│   │       │   │
│   │       │   ├── UserPage.vue              # Главная страница пользователей
│   │       │   └── UserTable.module.css      # Стили таблицы
│   │       │
│   │       └── index.ts           # Публичный API сущности
│   │
│   ├── components/                # Старые/legacy компоненты
│   │   └── UserTableOld.vue       # Старая версия таблицы
│   │
│   ├── assets/                    # Статические ресурсы
│   ├── App.vue                    # Корневой компонент
│   ├── main.ts                    # Точка входа приложения
│   ├── style.css                  # Глобальные стили
│   └── env.d.ts                   # TypeScript декларации
│
├── public/                        # Публичные файлы
├── dist/                          # Собранное приложение
├── Dockerfile                     # Docker конфигурация
├── nginx.conf                     # Конфигурация nginx
├── .dockerignore                  # Исключения для Docker
├── index.html                     # HTML шаблон
├── vite.config.ts                 # Конфигурация Vite
├── tsconfig.json                  # Конфигурация TypeScript
└── package.json                   # Зависимости и скрипты
```
