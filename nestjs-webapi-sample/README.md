# Nest.js WebAPI Sample.

## What's this ?

TypeScript + Nest.js + TypeORM で作成する「WebAPI の雛形」です。

## Special characteristics

- 想定が「既存アプリケーションのリプレイス」であるため「DB はすでにある」前提
  - 「Entity クラスからのマイグレーション」はしない
  - 極力「SQL でマイグレーション」を行う
  - 本来「TypeORM で Entity を作っていれば PrimaryGeneratedColumn な列が作れるはず」だが、探した限りでは「Sequence 名を指定するところがない」「期待している Sequence がなければ null で Insert しようとする」ようであるので「自力で取ってセット」という実装になっている
