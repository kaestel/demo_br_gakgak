<? include_once($_SERVER['FRAMEWORK_PATH']."/include/segment.php") ?>
<!DOCTYPE html>
<html lang="da">
<head>
	<!-- (c) & (p) hvadhedderde.com 2011 //-->
	<!-- All material protected by copyrightlaws, as if you didnt know //-->
	<title>BR GaKGaK</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	<meta name="viewport" content="width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=1.0;" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

	<? if($_SESSION["dev_includes"]) { ?>
		<link type="text/css" rel="stylesheet" media="all" href="/css/lib/seg_<?= $_SESSION["segment"] ?>_include.css" />
		<script type="text/javascript" src="/js/lib/seg_<?= $_SESSION["segment"] ?>_include.js"></script>
	<? } else { ?>
		<link type="text/css" rel="stylesheet" media="all" href="/css/seg_<?= $_SESSION["segment"] ?>.css" />
		<script type="text/javascript" src="/js/seg_<?= $_SESSION["segment"] ?>.js"></script>
	<? } ?>

</head>

<body class="i:validdevice">

<div id="page" class="i:page">

	<div id="header"></div>

	<div id="content" class="picked">
		<div class="scene i:picked">
			<h1>Du er nu en:</h1>
			<ul class="picker">
				<li class="header askepot"></li>
				<li class="body askepot"></li>
				<li class="footer askepot"></li>
			</ul>
			<div class="pickertext">
				<p>Askepot - Askepot - Askepot</p>
			</div>
			<div class="enter">
				<a href="participant.php">Send ind</a>
			</div>
			<div class="tip">
				<a href="tip.php">Email en ven</a>
			</div>
			<div class="facebook">
				<a id="facebook_link">Del på Facebook</a>
			</div>
			<div class="infobutton">
				<a href="info.php">Sådan spiller du</a>
			</div>
			<div class="back">
				<a href="choose.php">Tilbage</a>
			</div>
			<div class="logo">
				<a href="index.php"></a>
			</div>
		</div>
	</div>

	<div id="footer"></div>

</div>

</body>
</html>