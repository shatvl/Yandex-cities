import notify from '../../services/notify/notify'
import answer from '../../services/answer/answer'
import { Answer, ANSWER_TYPES } from '../../store/modules/answers'
import Vue from 'vue'
import * as utils from '../../utils/utils'

class Map {
    [key: string]: any;
}

const YmapComponent = Vue.extend({
    data() {
        return {
            emitter: utils.emitter,
            map: new Map()
        }
    },
    methods: {
        init() {
            this.map = new window.ymaps.Map('map', { center: [35, 53], zoom: 2, controls: [] }); 
        },
        initListeners() {
            this.emitter.$on('addCity', this.findCity);
        },
        findCity(data: any) {
            let {city, user = true} = data;
            window.ymaps.geocode(city, {results: 1, kind: 'locality'})
                        .then((res: any) => {
                            if (res.geoObjects.getLength()) {
                                res.geoObjects.each((geo: any) => {
                                    let id = geo.properties.get('metaDataProperty').GeocoderMetaData.id;
                                    if (this.checkIfCityExists(id, geo.properties.get('metaDataProperty').GeocoderMetaData.text)) {
                                        user ? notify.ACTIONS.show(notify.MESSAGES.duplicated_answer, notify.TYPES.error) : this.emitter.$emit('findCityByComputerAgain');
                                        return;
                                    }
                                    let isLocality = ['locality', 'province'].indexOf(geo.properties.get('metaDataProperty').GeocoderMetaData.kind) !== -1;
                                    if (isLocality) {
                                        geo.options.set('preset', 'islands#circleIcon');
                                        geo.options.set('iconColor', '#ffdb4d');
                                        this.map.geoObjects.add(geo);
                                        let meta = geo.properties.get('metaDataProperty').GeocoderMetaData,
                                            answ = {
                                                 type: user ? ANSWER_TYPES.user : ANSWER_TYPES.computer,
                                                 createdAt: new Date(), 
                                                 meta: meta.text + ' [' + meta.Address.country_code + ']', 
                                                 text: city
                                            } as Answer;
                                        answer.ACTIONS.add(answ);
                                        answer.ACTIONS.setLastLetter(answ.text);
                                        if (user) {
                                            this.emitter.$emit('userAnswered', answ);
                                            notify.ACTIONS.show(notify.MESSAGES.city_is_found, notify.TYPES.success);
                                        } else {
                                            this.emitter.$emit('computerAnswered', answ);
                                        }
                                    } else {
                                        user ? notify.ACTIONS.show(notify.MESSAGES.city_not_found, notify.TYPES.error) : this.emitter.$emit('findCityByComputerAgain');
                                    }
                                });
                            } else {
                                user ? notify.ACTIONS.show(notify.MESSAGES.city_not_found, notify.TYPES.error) : this.emitter.$emit('findCityByComputerAgain');
                            }
                        });
        },
        checkIfCityExists(id: string, text: string = '') {
            let founded = false;
            this.map.geoObjects.each((geoObject: any) => {
                if (!founded) {
                    founded = !!id ? geoObject.properties.get('metaDataProperty').GeocoderMetaData.id === id
                                   : geoObject.properties.get('metaDataProperty').GeocoderMetaData.text === text;
                }
            });
            
            return founded;
        }
    },
    mounted() {
        if (this.emitter.scriptIsNotAttached) {
            const yandexMapScript = document.createElement('script');
            yandexMapScript.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?lang=ru_RU');
            yandexMapScript.setAttribute('async', '');
            document.body.appendChild(yandexMapScript);
            this.emitter.scriptIsNotAttached = false;
            yandexMapScript.onload = () => {
                this.emitter.$emit('scriptIsLoaded');
            }
        }
        this.emitter.$on('scriptIsLoaded', () => {
            window.ymaps.ready(this.init);
            this.initListeners();
        });
    }
});

export default YmapComponent;