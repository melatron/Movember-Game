<?php

use Framework\Factory\AdapterFactory;
use Framework\Support\GeoIP\Reader;
use Framework\Http\Request;

/**
 * Dump and Die
 *
 * @author lubomir.gavadinov
 * @param  dynamic  mixed
 * @return void
 */
function dd()
{
	echo '<pre>';
	array_map(function($x) { var_dump($x); }, func_get_args());
	die;
}

/**
 * Pretty Print
 *
 * @author lubomir.gavadinov
 * @param  dynamic  mixed
 * @return void
 */
function pp()
{
	echo '<pre>';
	array_map(function($x) { print_r($x); }, func_get_args());
}

/**
 * Return the passed object. Useful for chaining.
 *
 * @author lubomir.gavadinov
 * @param Object $object
 * @return Object
 */
function chain($object)
{
	return $object;
}

/**
 * Checks if a string ends with a given substring
 *
 * @author lubomir.gavadinov
 * @param string $haystack
 * @param string $needle
 * @return boolean
 */
function endsWith($haystack, $needle)
{
	if ($needle == substr($haystack, -strlen($needle))) return true;
	return false;
}

/**
 * Checks if a string starts with a given substring
 *
 * @author lubomir.gavadinov
 * @param string $haystack
 * @param string $needle
 * @return boolean
 */
function startsWith($haystack, $needle)
{
	if ($needle != '' && strpos($haystack, $needle) === 0) return true;
	return false;
}

/**
 * Checks if a string contains a given substring
 *
 * @author lubomir.gavadinov
 * @param string $haystack
 * @param string $needle
 * @return boolean
 */
function contains($haystack, $needle)
{
	if ($needle != '' && strpos($haystack, $needle) !== false) return true;
	return false;
}

/**
* Convert strings with underscores into CamelCase
*
* @param    string    $string    The string to convert
* @param    bool    $first_char_caps    camelCase or CamelCase
* @return    string    The converted string
*/
function underscoreToCamelCase($string, $first_char_caps = false)
{
	if( $first_char_caps == true ) {
		$string[0] = strtoupper($string[0]);
	}
	$func = create_function('$c', 'return strtoupper($c[1]);');
	return preg_replace_callback('/_([a-z])/i', $func, $string);
}

/**
 * Converts camelCase string to its under_score representation.
 * The method works only on standard latin characters.
 *
 * @param string $camelCased
 * @return string
 */
function camelCaseToUnderScore($camelCased)
{
	$underscored = preg_replace('/([A-Z])/', '_$0', $camelCased);
	$underscored = mb_convert_case($underscored, MB_CASE_LOWER);

	return $underscored;
}

function getRealIpAddress()
{
	if (Request::isInConsole()) {
		return;
	}
	if (! empty($_SERVER['HTTP_CLIENT_IP']) && ($_SERVER['HTTP_CLIENT_IP'] != 'unknown')) {
		$ip = $_SERVER['HTTP_CLIENT_IP']; // share internet
	} elseif (! empty($_SERVER['HTTP_X_FORWARDED_FOR']) && ($_SERVER['HTTP_X_FORWARDED_FOR'] != 'unknown')) {
		$ip = $_SERVER['HTTP_X_FORWARDED_FOR']; // pass from proxy
	} else {
		$ip = $_SERVER['REMOTE_ADDR'];
	}

	return $ip;
}

function getGeoIpData($ip = null)
{
	if (is_null($ip)) {
		$ip = getRealIpAddress();
	}

	$gi = new Reader(framework_dir . '/Support/GeoIP/GeoIP2-Country.mmdb');

	$record = $gi->get($ip);

	$geoData= array(
		'lang' => strtolower($record['country']['iso_code'])
	);

	return $geoData;
}

/**
 * Get DB date
 *
 *
 * @author lubomir.gavadinov
 * @return number
 */
function getCurrentDate()
{
	return AdapterFactory::create()->getNows()->currentDate;
}

/**
 * Get DB timestamp
 *
 *
 * @author lubomir.gavadinov
 * @return number
 */
function getCurrentTimestamp()
{
	return AdapterFactory::create()->getNows()->currentTimestamp;
}

/**
 * Checks if array is associative
 *
 * @author lubomir.gavadinov
 * @param array $array
 * @return boolean
 */
function isAssoc(array $array)
{
	return (bool) count(array_filter(array_keys($array), 'is_string'));
}

/**
 * Convern array keys to camelCase
 * @author viktor.velikov
 * @param array $array
 * @return array
 */
function arrayKeysToCamelCase(array $array)
{
	if (empty($array)) {
		return $array;
	}

	foreach ($array as $key => $value) {
		$return[underscoreToCamelCase($key)] = $value;
	}

	return $return;
}

/**
 * Convern array keys to under_score
 * @author viktor.velikov
 * @param array $array
 * @return array
 */
function arrayKeysToUnderScore(array $array)
{
	if (empty($array)) {
		return $array;
	}

	foreach ($array as $key => $value) {
		$return[camelCaseToUnderScore($key)] = $value;
	}

	return $return;
}

/**
 * Return the given value casted to INTEGER
 * NOTE - php function intval returns 0 if null is passed
 * Used mostly to remain the possibility to unsetNullValues()
 * @author viktor.velikov
 * @param mixed $value
 * @return Ambigous <NULL, integer>
 */
function toInt($value)
{
	return is_null($value) ? null : intval($value);
}

/**
 * Return the given value casted to FLOAT
 * NOTE - php function floatval returns 0 if null is passed
 * Used mostly to remain the possibility to unsetNullValues()
 * @author viktor.velikov
 * @param mixed $value
 * @return Ambigous <NULL, number>
 */
function toFloat($value)
{
	return is_null($value) ? null : floatval($value);
}

/**
 * Set values deep in the array using DOT notation
 *
 *
 * @author lubomir.gavadinov
 * @param string $path
 * @param mixed $value
 * @param array $arr
 */
function setArrayDotNotation($path, $value, array &$arr)
{
	$addToArray = false;
	if (endsWith($path, '[]')) {
		$addToArray = true;
		$path = preg_replace('/\[\]/', '', $path);
	}
	$keys = explode('.', $path);
	while(count($keys) > 1) {
		$key = array_shift($keys);
		if(!isset($arr[$key])) {
			$arr[$key] = array();
		}
		$arr = &$arr[$key];
	}

	$key = reset($keys);
	if ($addToArray) {
		$arr[$key][] = $value;
	} else {
		$arr[$key] = $value;
	}
}

/**
 * Get values from array using DOT notation
 *
 *
 * @author lubomir.gavadinov
 * @param string $path
 * @param array $arr
 * @param mixed $default
 * @return array|unknown
 */
function getArrayDotNotation($path, array $arr, $default = null)
{
	$keys = explode('.', $path);
	foreach ($keys as $key) {
		if (isset($arr[$key])) {
			$arr = $arr[$key];
		} else {
			return $default;
		}
	}

	return $arr;
}
