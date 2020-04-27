export default function (context) {
  if (context.ssrContext) {
    let url = context.ssrContext.url;
    let one = url.split('/')[1];
    switch (one) {
      case 'Xuzhou':
        context.store.state.cookie.city = 112;
        break;
      case 'Hangzhou':
        context.store.state.cookie.city = 1;
        break;
      case 'Ningbo':
        context.store.state.cookie.city = 36;
        break;
      case 'Huzhou':
        context.store.state.cookie.city = 104;
        break;
      case 'Jiaxing':
        context.store.state.cookie.city = 38;
        break;
      case 'Shaoxing':
        context.store.state.cookie.city = 73;
        break;
      case 'Zhanjiang':
        context.store.state.cookie.city = 93;
        break;
      case 'Chongqing':
        context.store.state.cookie.city = 41;
        break;
      case 'Chengdu':
        context.store.state.cookie.city = 47;
        break;
      case 'Guiyang':
        context.store.state.cookie.city = 3;
        break;
    }
  }

}
