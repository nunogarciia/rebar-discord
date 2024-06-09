import { useTranslate } from '@Shared/translate.js';
const { setBulk } = useTranslate();

const Translations = {
    en: {
        'dc.systems.loading': 'Starting all services! 🌍',
        'dc.systems.ok': 'All systems ready! 🌍',
        'dc.systems.title': 'MetaRP \t\t 🚀',
        'dc.version': 'version: 1.0.0',
        'dc.log.title': 'Player Log',
        'dc.log.disconnect': '_altv.name_ (_player.id_) disconnected from the server.',
        'dc.log.login': '_dc.name_ (_player.id_) login into server.',
        'dc.log.create.char': '_altv.name_ (_player.id_) created a new character (_player.name_).',
        'dc.log.spawn': '_altv.name_ (_player.id_) spawned.',
    },
    pt: {
        'dc.systems.loading': 'Todos os serviços estarão operacionais dentro de instantes! 🌍',
        'dc.systems.ok': 'Todos os serviços estão operacionais! 🌍',
        'dc.systems.title': 'MetaRP \t\t 🚀',
        'dc.version': 'versão: 1.0.0',
        'dc.log.title': 'Player Log',
        'dc.log.disconnect': '_altv.name_ (_player.id_) saiu do servidor.',
        'dc.log.login': '_dc.name_ (_player.id_) entrou no servidor.',
        'dc.log.create.char': '_altv.name_ (_player.id_) criou uma nova personagem (_player.name_).',
        'dc.log.spawn': '_altv.name_ (_player.id_) fez spawn (_player.spawn_).',
    }
}

setBulk(Translations);

export default Translations;