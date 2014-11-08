<?php

namespace Core;

class ClassLoader
{

	/**
	 * The registered directories.
	 *
	 * @author lubomir.gavadinov
	 * @var array
	 */
	protected static $directories = array();

	/**
	 * Indicates if a ClassLoader has been registered.
	 *
	 * @author lubomir.gavadinov
	 * @var bool
	 */
	protected static $registered = false;

	/**
	 * Load the given class file.
	 *
	 * @author lubomir.gavadinov
	 * @param  string  $class
	 * @return void
	 */
	public static function load($class)
	{
		$class = static::normalizeClass($class);

		if (file_exists($path = app_dir . $class)) {
			require_once $path;
			return true;
		}

		foreach (static::$directories as $directory) {
			if (file_exists($path = app_dir . $directory . DIRECTORY_SEPARATOR . $class)) {
				require_once $path;
				return true;
			}
		}
	}

	/**
	 * Get the normal file name for a class.
	 *
	 * @author lubomir.gavadinov
	 * @param  string  $class
	 * @return string
	 */
	public static function normalizeClass($class)
	{
		if ($class[0] == '\\') {
			$class = substr($class, 1);
		}

		return str_replace(array('\\', '_'), DIRECTORY_SEPARATOR, $class) . '.php';
	}

	/**
	 * Register the given class loader on the auto-loader stack.
	 *
	 * @author lubomir.gavadinov
	 * @return void
	 */
	public static function register()
	{
		if (!static::$registered) {
			spl_autoload_register(array(get_class(), 'load'), false, true);

			static::$registered = true;
		}
	}

	/**
	 * Add directories to the class loader.
	 *
	 * @author lubomir.gavadinov
	 * @param  string|array  $directories
	 * @return void
	 */
	public static function addDirectories($directories)
	{
		static::$directories = array_merge(static::$directories, (array) $directories);

		static::$directories = array_unique(static::$directories);
	}

	/**
	 * Remove directories from the class loader.
	 *
	 * @author lubomir.gavadinov
	 * @param  string|array  $directories
	 * @return void
	 */
	public static function removeDirectories($directories = null)
	{
		if (is_null($directories)) {
			static::$directories = array();
		} else {
			$directories = (array) $directories;

			static::$directories = array_filter(static::$directories, function($directory) use ($directories) {
				return (!in_array($directory, $directories));
			});
		}
	}

	/**
	 * Gets all the directories registered with the loader.
	 *
	 * @author lubomir.gavadinov
	 * @return array
	 */
	public static function getDirectories()
	{
		return static::$directories;
	}

}
