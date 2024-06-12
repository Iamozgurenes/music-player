class Music {
    constructor(title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName() {
        return this.title + " - " + this.singer;
    }
}

const musicList = [
    new Music("Hayyam", "Siyasiyabend", "siyasiyabend.jpg", "hayyam.mp3"),
    new Music("Sen Bilmezsin", "Dedublüman", "dedubluman.jpg", "SenBilmezsin.mp3"),
    new Music("Can Evimden Vurdun", "Siyasiyabend", "siyasiyabend2.jpg", "canevimdenvurdun.mp3"),
    new Music("Siren Sesi", "Talha Yıldırır", "talhayildirir.jpg", "sirensesi.mp3"),
    new Music("Sararmış Kağıt", "Barış Kocatürk", "bariskocaturk.jpg", "sararmiskagit.mp3"),
    new Music("N'apim Tabiatım Böyle", "Teoman", "teoman.jpg", "napimtabiatimboyle.mp3"),
    new Music("Müzeyyen", "Haymatlos", "muzeyyen.jpg", "muzeyyen.mp3"),
    new Music("Siyah", "Karsu", "karsu.jpg", "karsusiyah.mp3"),
    new Music("Dünya Büküüldü", "Biz", "biz.jpg", "dunyabukuldu.mp3"),
    
    
];