import is_array from '@/utils/is/array.js';
import is_plain_object from '@/utils/is/plainObject.js';


export default function extend (_oTarget)
{
	var options, name, src, copy, copyIsArray, clone,
		args = arguments,
		i = 1,
		length = args.length,
		deep = false;

	// Handle a deep copy situation
	if (typeof _oTarget === 'boolean')
	{
		deep = true;

		// Skip the boolean and the target
		_oTarget = args[i] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if (typeof _oTarget !== 'object' && typeof _oTarget !== 'function')
	{
		_oTarget = {};
	}


	for (; i < length; i++)
	{
		options = args[i];

		// Only deal with non-null/undefined values
		if (options == null) continue;


		// Extend the base object
		for (name in options)
		{
			copy = options[name];

			// Prevent never-ending loop
			if (_oTarget === copy) continue;


			// Recurse if we're merging plain objects or arrays
			if (deep && copy && (is_plain_object(copy) || (copyIsArray = is_array(copy))))
			{
				src = _oTarget[name];

				// Ensure proper type for the source value
				if (copyIsArray && !is_array(src))
				{
					clone = [];
				}
				else if (!copyIsArray && !is_plain_object(src))
				{
					clone = {};
				}
				else
				{
					if (typeof src !== 'object' && typeof src !== 'function')
					{
						console.log('!!!', src);
					}

					clone = src;
				}

				copyIsArray = false;

				// Never move original objects, clone them
				_oTarget[name] = extend(deep, clone, copy);
			}
			else
			{
				_oTarget[name] = copy;
			}
		}
	}

	// Return the modified object
	return _oTarget;
};
