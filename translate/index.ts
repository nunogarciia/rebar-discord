import { useTranslate } from '@Shared/translate.js';
const { setBulk } = useTranslate();

const Translations = {
    en: {
        'dc.systems.loading': 'Starting all services! 🌍',
        'dc.systems.ok': 'All systems ready! 🌍',
        'dc.title': 'MetaRP \t\t 🚀',
        'dc.version': 'version: 1.0.0',
        'dc.log.disconnect': '_player.name_ (_player.id_) disconnected from the server.',
        'dc.log.login': '_player.name_ (_player.id_) login into server.',
    },
    pt: {
        'dc.systems.loading': 'Todos os serviços estarão operacionais dentro de instantes! 🌍',
        'dc.systems.ok': 'Todos os serviços estão operacionais! 🌍',
        'dc.title': 'MetaRP \t\t 🚀',
        'dc.version': 'versão: 1.0.0',
        'dc.log.disconnect': '_player.name_ (_player.id_) saiu do servidor.',
        'dc.log.login': '_player.name_ (_player.id_) entrou no servidor.',
    }
}

setBulk(Translations);

export default Translations;