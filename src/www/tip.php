<?php include_once($_SERVER["LOCAL_PATH"]."/includes/segment.php") ?>
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

	<? if($_SESSION["dev"]) { ?>
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

	<div id="content">

		<div class="overlay tip">
			<div class="scene i:tip">

				<div class="tipafriend">
					<form action="#" method="post" name="tipafriend">
						<fieldset>
							<input type="hidden" name="bodypart_1" value="h_askepot" id="bodypart_1" />
							<input type="hidden" name="bodypart_2" value="k_askepot" id="bodypart_2" />
							<input type="hidden" name="bodypart_3" value="b_askepot" id="bodypart_3" />
						  
							<label for="name_input">Dit navn</label>
							<input type="input" class="text name" name="name" id="name_input" value="" />

							<label for="email_input">Din e-mail adresse</label>
							<input type="input" class="text email" name="email" id="email_input" value="" />

							<label for="friend_name_input">Din vens navn</label>
							<input type="input" class="text friend_name" name="friend_name" id="friend_name_input" value="" />

							<label for="friend_email_input">Din vens e-mail adresse</label>
							<input type="input" class="text friend_email" name="friend_email" id="friend_email_input" value="" />

							<label for="message_text">Skriv en besked</label>
							<textarea class="name" name="message" id="message_text"></textarea>

							<input type="submit" class="button submit" value="Send" />
						</fieldset>
					</form>

					<div class="close"><a href="picked.php">Luk</a></div>
				</div>

			</div>
		</div>
	</div>

	<div id="footer"></div>

</div>

</body>
</html>