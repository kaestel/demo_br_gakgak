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

	<div id="content" class="participant">
		<div class="scene i:participant">

			<div class="start">
				<a href="dressgame.php">Leg videre her</a>
			</div>
			
			<div class="participant">
				<h1>Udfyld her</h1>
				
				<form action="thanks.php" method="post" name="participant">
					<fieldset>
						<input type="hidden" name="bodypart_1" value="h_askepot" id="bodypart_1" />
						<input type="hidden" name="bodypart_2" value="k_askepot" id="bodypart_2" />
						<input type="hidden" name="bodypart_3" value="b_askepot" id="bodypart_3" />
						
						<label for="name_input">Navn</label>
						<input type="input" class="text name" name="name" id="name_input" value="" />
						
						<label for="age_input">Alder</label>
						<input type="input" class="text age" name="age" id="age_input" value="" />
						
						<label for="address_input">Adresse</label>
						<textarea class="text address" name="address" id="address_input"></textarea>
						
						<label for="zipcode_input">Postnummer</label>
						<input type="input" class="text postal" name="zipcode" id="zipcode_input" value="" />
						
						<label for="city_input">By</label>
						<input type="input" class="text city" name="city" id="city_input" value="" />
						
						<label for="phone_input">Tlf</label>
						<input type="input" class="text phone" name="phone" id="phone_input" value="" />

						<label for="email_input">E-mail</label>
						<input type="input" class="text email" name="email" id="email_input" value="" />
						
						<p class="member">Club BR medlem?</p>
						
						<label for="member_input_yes" id="member_input_yes_label" class="radio_label">
							Ja
							<input type="radio" class="delivery" name="club_member" id="member_input_yes" value="yes" />
						</label>
						
						<label for="member_input_no" id="member_input_no_label" class="radio_label">
							Nej
							<input type="radio" class="delivery" name="club_member" id="member_input_no" value="no" />
						</label>
						
						<div id="form_error">Du glemte at udfylde et eller flere felter!</div>
						
						<input type="submit" class="button submit" value="Send" />
					</fieldset>
				</form>
			</div>
			
			<div class="back">
				<a href="picked.php">Tilbage</a>
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