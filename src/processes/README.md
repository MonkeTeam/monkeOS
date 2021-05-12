# Process
In MonkeOS, all the processes will be stored as a file or files in a directory.

After installing the MonkeOS, the place where the processes will be stored would be in `/proc` directory.

# Example
The first process added to the OS is `working_directory`. This process will have information about where the user is in the filesystem currently.

So, after booting the OS, `/proc/working_directory` file will be generated and it will have the information about user's current working directory.


Aborting a process will make the process file (Example: `/proc/working_directory`) be deleted.
