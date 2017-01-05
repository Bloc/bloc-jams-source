var Utilities = BlocJams.Utilities;
var PlayerBar = BlocJams.PlayerBar;
var SeekBar = BlocJams.SeekBar;
var SongList = BlocJams.SongList;
var Player = BlocJams.Player;

//-----------------------------

var $albumTitle = $('.album-view-title');
var $albumArtist = $('.album-view-artist');
var $albumReleaseInfo = $('.album-view-release-info');
var $albumImage = $('.album-cover-art');

var buildAlbumPage = function(album, Player) {
    $albumTitle.text(album.name);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    
    SongList.build(album.songs, Player);
    PlayerBar.build(Player);
};

$(document).ready(function() {
    // Build page
    var album = albumPicasso;
    
    // Set Current Album
    buildAlbumPage(album, Player);
    
    // Setup initial state and handlers
    Player.setup(album);
});
