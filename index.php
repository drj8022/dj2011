<?php require_once('crawling.php'); ?>
<!doctype html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title><?php $crawling->title(); ?> | Dan Johnston</title>
  <meta name="description" content="Danny J like whoa">
  <meta name="author" content="Dan Johnston">

  <meta name="viewport" content="width=device-width,initial-scale=1">

  <!-- CSS concatenated and minified via ant build script-->
  <link rel="stylesheet" href="css/style.css">
  <!-- end CSS-->
  <link rel="stylesheet" href="js/jcarousel/skins/danj/skin.css">
  <link href='http://fonts.googleapis.com/css?family=Francois+One' rel='stylesheet' type='text/css'>
  <link href='http://fonts.googleapis.com/css?family=PT+Serif&subset=latin' rel='stylesheet' type='text/css'>

  <script src="js/libs/modernizr-2.0.6.min.js"></script>

</head>

<body>

  <div id="container">
    <header>
		<a href="#"><img src ="img/logo.png" alt="Dan Johnston | Designer"></a>
		<div class="contact">
			<a href="/bio" class="dan"></a>
			<img src="img/contact_info.png" class="contact_info" alt="contact info" />
		</div>
    </header>

    <div id="main" role="main">
        <div class="content"><?php $crawling->content(); ?></div>
    </div>

    <footer>
    	<div class="text">
			<p>Resume in <a href="http://danjohnston.com/resume-dan-johnston.pdf"><span class="small-caps">(PDF)</span></a> and <a href="http://danjohnston.com/resume_dan_johnston.txt"><span class="small-caps">(TXT)</span></a> formats, <a href="http://danjohnston.com/code-sample-dan-johnston.js">JavaScript</a> code sample</p>
			<p>Copyleft <img src="img/copyleft.png" class="copyleft" alt="copyleft icon" /> Dan Johnston, 2001 &mdash; <?php echo date('Y'); ?></p>
		</div>
    	<div class="icons">
    		<a class="twitter" href="http://twitter.com/#!/drj8022" title="twitter" target="_blank"></a>
    		<a class="linkedin" href="http://www.linkedin.com/in/drj8022" title="linkedin" target="_blank"></a>
    		<a class="foursquare" href="https://foursquare.com/drj8022" title="foursquare" target="_blank"></a>
    		<a class="soundcloud" href="http://soundcloud.com/dan-johnston" title="soundcloud" target="_blank"></a>
    		<a class="flickr" href="http://www.flickr.com/photos/drj8022/" title="flickr" target="_blank"></a>
    		<a class="blog" href="http://blog.danjohnston.com/" title="blog" target="_blank"></a>
    	</div>
    </footer>
  </div> <!--! end of #container -->


  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/libs/jquery-1.6.2.min.js"><\/script>')</script>
  <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/libs/jquery-ui-1.8.16.custom.min.js"><\/script>')</script>


  <!-- scripts concatenated and minified via ant build script-->
  <script defer src="js/plugins.js"></script>
  <script defer src="js/script.js"></script>
  <!-- end scripts-->


  <script> // Change UA-XXXXX-X to be your site's ID
    window._gaq = [['_setAccount','UA-4449684-1'],['_trackPageview'],['_trackPageLoadTime']];
    Modernizr.load({
      load: ('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js'
    });
  </script>

  <!--[if lt IE 7 ]>
    <script src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script>
    <script>window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})})</script>
  <![endif]-->
  
</body>
</html>
