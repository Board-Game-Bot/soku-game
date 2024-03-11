import { createSignal } from 'solid-js';

export const downloadGame = (npmPackage: string, version: string, stuff: string, onLoad: () => void) => {
  try {
    console.log(123);
    if (document.getElementById(`${npmPackage}-${version}-${stuff}`)) return ;

    const dom = document.createElement('script');
    dom.type = 'module';
    dom.id = `${npmPackage}-${version}-${stuff}`;
    dom.src = `https://cdn.jsdelivr.net/npm/${npmPackage}@${version}/dist/${stuff}/index.js`;
    document.body.append(dom);
    dom.onload = onLoad;
  }
  catch (e: any) {console.log(e);}
};

export const [loadingMap, setLoadingMap] = createSignal<Record<string, number>>({});
