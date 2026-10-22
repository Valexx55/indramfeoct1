
import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationRef } from '@angular/core';

import { appConfig } from './app/app.config';
import { App } from './app/app';

let angularApp: ApplicationRef | null = null;
let hostElement: HTMLElement | null = null;

export async function bootstrap() {
  console.log('Favorites: bootstrap');
}

export async function mount() {
  console.log('Favorites: mount');

  const container = document.getElementById('favorites-container');

  if (!container) {
    throw new Error('Falta favorites-container');
  }

  hostElement = document.createElement('app-root');
  container.appendChild(hostElement);

  try {
    angularApp = await bootstrapApplication(App, appConfig);
  } catch (error) {
    hostElement.remove();
    hostElement = null;
    throw error;
  }
}

export async function unmount() {
  console.log('Favorites: unmount');

  angularApp?.destroy();
  angularApp = null;

  hostElement?.remove();
  hostElement = null;
}
